import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import AuthService from '../services/auth.service.js';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  clearRefreshToken,
} from '../constants/auth.constant.js';

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // 손님 회원가입
  signUpCustomer = async (req, res, next) => {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const data = await this.#service.signUpCustomer({
        email,
        password,
        name,
        phoneNumber,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      if (error.name === 'existedCustomer') errorForm(error, res);
      else next(error);
    }
  };

  // 사장님 회원가입
  signUpOwner = async (req, res, next) => {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const data = await this.#service.signUpOwner({
        email,
        password,
        name,
        phoneNumber,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      if (error.name === 'existedOwner') errorForm(error, res);
      else next(error);
    }
  };

  // 이메일 인증
  emailVerify = async (req, res, next) => {
    try {
      const { email, verificationCode, memberType } = req.body;
      const data = await this.#service.emailVerify({
        email,
        verificationCode,
        memberType,
      });

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.EMAIL_VERIFY.SUCCEED,
        data,
      });
    } catch (error) {
      if (
        error.name === 'existedUser' ||
        error.name === 'wrongCode' ||
        error.name === 'noInput' ||
        error.name === 'isVerified'
      )
        errorForm(error, res);
      else next(error);
    }
  };

  // 로그인
  logIn = async (req, res, next) => {
    try {
      const { email, password, memberType } = req.body;
      const { accessToken, refreshToken } = await this.#service.logIn({
        email,
        password,
        memberType,
      });

      res.cookie('accessToken', accessToken, {
        maxAge:
          1000 *
          60 *
          ACCESS_TOKEN_EXPIRES_IN.slice(0, ACCESS_TOKEN_EXPIRES_IN.length - 1),
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge:
          1000 *
          60 *
          60 *
          24 *
          REFRESH_TOKEN_EXPIRES_IN.slice(
            0,
            REFRESH_TOKEN_EXPIRES_IN.length - 1,
          ),
        httpOnly: true,
      });

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.LOG_IN.SUCCEED,
      });
    } catch (error) {
      if (error.name === 'isPasswordMatched' || error.name === 'noVerified')
        errorForm(error, res);
      else next(error);
    }
  };

  // 로그아웃
  logOut = async (req, res, next) => {
    try {
      const { userId, ownerId } = req.user;
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      if (userId) clearRefreshToken(userId);
      if (ownerId) clearRefreshToken(ownerId);

      res.status(HTTP_STATUS.OK).json({ message: '로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  };

  // 회원 탈퇴
  deleteId = async (req, res, next) => {
    try {
      const { email, memberType } = req.user;
      const { password } = req.body;

      const data = await this.#service.deleteId({
        email,
        password,
        memberType,
      });

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.DELETE_ID.SUCCEED,
        data,
      });
    } catch (error) {
      if (error.name === 'isPasswordMatched' || error.name === 'noInput')
        errorForm(error, res);
      else next(error);
    }
  };

  // 본인 정보 조회
  getProfile = async (req, res, next) => {
    try {
      const { email, memberType } = req.user;

      const data = await this.#service.getProfile({ email, memberType });

      return res.status(HTTP_STATUS.OK).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 본인 정보 수정
  updateProfile = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { password, phoneNumber } = req.body;

      if (password) {
        const data = {
          email,
          password,
        };
        await this.#service.updateProfile(data);
        return res
          .status(HTTP_STATUS.CREATED)
          .json(MESSAGES.AUTH.UPDATE_PASSWORD.SUCCEED);
      }

      if (phoneNumber) {
        const data = {
          email,
          phoneNumber,
        };
        await this.#service.updateProfile(data);
        return res
          .status(HTTP_STATUS.CREATED)
          .json(MESSAGES.AUTH.UPDATE_PHONENUMBER.SUCCEED);
      }

      if (!password && !phoneNumber) {
        const error = new Error(MESSAGES.AUTH.UPDATE_PHONENUMBER.FALSE);
        error.status = HTTP_STATUS.BAD_REQUEST;
        error.name = 'noInput';
        throw error;
      }
    } catch (error) {
      if (error.name === 'noInput') errorForm(error, res);
      else next(error);
    }
  };
}

export default new AuthController(AuthService);

function errorForm(err, res) {
  return res.status(err.status).json({ message: err.message });
}
