import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import AuthService from '../services/auth.service.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';

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
      const accessToken = await this.#service.logIn({
        email,
        password,
        memberType,
      });

      res.cookie('accessToken', accessToken, {
        maxAge:
          1000 *
          60 *
          60 *
          ACCESS_TOKEN_EXPIRES_IN.slice(0, ACCESS_TOKEN_EXPIRES_IN.length - 1),
      });
      console.log({ login: accessToken })

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
      res.clearCookie('token');

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

      const data = await this.#service.deleteId({email, password, memberType});

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
}

export default new AuthController(AuthService);

function errorForm(err, res) {
  return res.status(err.status).json({ message: err.message });
}
