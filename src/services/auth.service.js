import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import AuthRepository from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRES_IN,
  setRefreshToken,
} from '../constants/auth.constant.js';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/env.constant.js';
import nodemailer from 'nodemailer';
import {
  NODEMAILER_USER,
  NODEMAILER_PASS,
  EMAIL_SERVICE,
} from '../constants/env.constant.js';

class AuthService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }
  // 손님 회원가입
  signUpCustomer = async (authData) => {
    const { email, password, name, phoneNumber } = authData;

    const existedCustomer = await this.#repository.findCustomer(email);

    if (existedCustomer) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
      error.status = HTTP_STATUS.CONFLICT;
      error.name = 'existedCustomer';
      throw error;
    }

    const verificationCode = await sendVerificationCode(email);

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const data = await this.#repository.signUpCustomer({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      verificationCode,
    });

    data.password = undefined;
    data.verificationCode = undefined;

    return data;
  };

  // 사장님 회원가입
  signUpOwner = async (authData) => {
    const { email, password, name, phoneNumber } = authData;

    const existedOwner = await this.#repository.findOwner(email);

    if (existedOwner) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
      error.status = HTTP_STATUS.CONFLICT;
      error.name = 'existedOwner';
      throw error;
    }

    const verificationCode = await sendVerificationCode(email);

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const data = await this.#repository.signUpOwner({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      verificationCode,
    });

    data.password = undefined;
    data.verificationCode = undefined;

    return data;
  };

  // 이메일 인증
  emailVerify = async (authData) => {
    const { email, verificationCode, memberType } = authData;

    if (!email) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAIL.REQUIRED);
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.name = 'noInput';
      throw error;
    }

    if (!verificationCode) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAILVERIFICATION.REQUIRED);
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.name = 'noInput';
      throw error;
    }

    let user;

    if (memberType === 'customer') {
      user = await this.#repository.findCustomer(email);
    } else if (memberType === 'owner') {
      user = await this.#repository.findOwner(email);
    } else {
      const error = new Error(MESSAGES.AUTH.COMMON.MEMBERTYPE.WRONGTYPE);
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.name = 'noInput';
      throw error;
    }

    if (!user) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAIL.NONEXISTENT);
      error.status = HTTP_STATUS.UNAUTHORIZED;
      error.name = 'existedUser';
      throw error;
    }

    if (user.isVerified === true) {
      const error = new Error(
        MESSAGES.AUTH.COMMON.EMAILVERIFICATION.ALREADYDONE,
      );
      error.status = HTTP_STATUS.CONFLICT;
      error.name = 'isVerified';
      throw error;
    }

    if (user.verificationCode !== verificationCode) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAILVERIFICATION.WORNGCODE);
      error.status = HTTP_STATUS.UNAUTHORIZED;
      error.name = 'wrongCode';
      throw error;
    }

    if (memberType === 'customer') {
      user = await this.#repository.emailVerifyCustomer(email);
      await this.#repository.makeCustomerCart(user.userId);
    } else if (memberType === 'owner') {
      user = await this.#repository.emailVerifyOwner(email);
    }

    user.password = undefined;
    user.verificationCode = undefined;

    return user;
  };

  // 로그인
  logIn = async (authData) => {
    const { email, password, memberType } = authData;

    let user;

    if (memberType === 'customer') {
      user = await this.#repository.findCustomer(email);
    } else if (memberType === 'owner') {
      user = await this.#repository.findOwner(email);
    }

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);
    email;
    if (!isPasswordMatched) {
      const error = new Error(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
      error.status = HTTP_STATUS.UNAUTHORIZED;
      error.name = 'isPasswordMatched';
      throw error;
    }

    if (user.isVerified === false) {
      const error = new Error(
        MESSAGES.AUTH.COMMON.EMAILVERIFICATION.NOVERIFICATION,
      );
      error.status = HTTP_STATUS.FORBIDDEN;
      error.name = 'noVerified';
      throw error;
    }

    let payload;

    if (memberType === 'customer') {
      payload = { id: user.userId, memberType };
    } else if (memberType === 'owner') {
      payload = { id: user.ownerId, memberType };
    }

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    setRefreshToken(`${memberType}=${payload.id}`, refreshToken);

    return { accessToken, refreshToken };
  };

  // 회원 탈퇴
  deleteId = async (authData) => {
    const { email, password, memberType } = authData;

    let user;

    if (memberType === 'customer') {
      user = await this.#repository.findCustomer(email);
    } else if (memberType === 'owner') {
      user = await this.#repository.findOwner(email);
    }

    if (!password) {
      const error = new Error(MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED);
      error.status = HTTP_STATUS.BAD_REQUEST;
      error.name = 'noInput';
      throw error;
    }

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      const error = new Error(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
      error.status = HTTP_STATUS.UNAUTHORIZED;
      error.name = 'isPasswordMatched';
      throw error;
    }

    if (memberType === 'customer') {
      user = await this.#repository.deleteCustomerId(email);
    } else if (memberType === 'owner') {
      user = await this.#repository.deleteOwnerId(email);
    }

    return user.email;
  };

  // 본인 정보 조회
  getProfile = async (authData) => {
    const { email, memberType } = authData;

    let user;

    if (memberType === 'customer') {
      user = await this.#repository.findCustomer(email);
    } else if (memberType === 'owner') {
      user = await this.#repository.findOwner(email);
    }

    user.password = '*********';

    return user;
  };

  // 회원 정보 수정
  updateProfile = async (authData) => {
    const { email, password, phoneNumber } = authData;

    const updateData = {};

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
      updateData.password = hashedPassword;
    }

    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    let user = await this.#repository.updateProfile(email, updateData);
  };
}

export default new AuthService(AuthRepository);

// 랜덤 6글자 숫자,영어 대문자 생성 함수
function randomVerificationCode() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  characters = characters + characters.slice(26).repeat(2);
  let result = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

// 인증 코드 메일 보내는 함수
async function sendVerificationCode(email) {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  let verificationCode = randomVerificationCode();

  const mailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject: '이메일 인증을 완료해주세요',
    html: `<h1>인증 코드는 <strong>${verificationCode}</strong> 입니다.</h1>`,
  };
  await transporter.sendMail(mailOptions);

  return verificationCode;
}
