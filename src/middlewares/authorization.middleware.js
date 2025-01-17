import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../constants/env.constant.js';
import { prisma } from '../utils/prisma/index.js';
import authRepository from '../repositories/auth.repository.js';
import {
  refreshTokens,
  ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/auth.constant.js';

export const requireAccessToken = async (req, res, next) => {
  try {
    // 인증 정보 파싱
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // refreshToken은 존재하고 accessToken은 존재하지 않는 경우
    if (!accessToken && refreshToken) {
      let token = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      delete token.exp;
      if (refreshTokens[`${token.memberType}=${token.id}`] === refreshToken) {
        const makeAccessToken = jwt.sign(token, ACCESS_TOKEN_SECRET, {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });
        res.cookie('accessToken', makeAccessToken, {
          maxAge:
            1000 *
            60 *
            ACCESS_TOKEN_EXPIRES_IN.slice(
              0,
              ACCESS_TOKEN_EXPIRES_IN.length - 1,
            ),
          httpOnly: true,
        });
        accessToken = makeAccessToken;
      } else {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.AUTH.COMMON.JWT.WRONGREFRESHTOKEN,
        });
      }
    }

    // refreshToken과 accessToken 둘 다 없는 경우
    if (!accessToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
      });
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (error) {
      // AccessToken의 유효기한이 지난 경우
      if (error.name === 'TokenExpiredError') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.AUTH.COMMON.JWT.EXPIRED,
        });
      }
      // 그 밖의 AccessToken 검증에 실패한 경우
      else {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.AUTH.COMMON.JWT.INVALID,
        });
      }
    }

    // Payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
    const { id, memberType } = payload;
    let user;

    if (memberType === 'customer') {
      user = await authRepository.findCustomerId(id);
      console.log(user);
    } else if (memberType === 'owner') {
      user = await authRepository.findOwnerId(id);
    } else {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: MESSAGES.AUTH.COMMON.JWT.INVALID,
      });
    }

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
      });
    }

    user.password = undefined;
    user.memberType = memberType;

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    next(new Error('Authentication middleware error: ' + error.message));
  }
};
