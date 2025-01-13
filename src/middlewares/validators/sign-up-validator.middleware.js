import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import {
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
  MAX_PHONE_LENGTH,
} from '../../constants/auth.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQUIRED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  name: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
  }),
  phoneNumber: Joi.string().min(MIN_PHONE_LENGTH).max(MAX_PHONE_LENGTH).required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PHONE.REQUIRED,
    'string.min': MESSAGES.AUTH.COMMON.PHONE.LENGTH,
    'string.max': MESSAGES.AUTH.COMMON.PHONE.LENGTH,
  }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
