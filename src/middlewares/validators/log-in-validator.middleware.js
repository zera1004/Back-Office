import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
  }),
  memberType: Joi.string().valid('customer', 'owner').required().messages({
    'any.required': MESSAGES.AUTH.COMMON.MEMBERTYPE.WRONGTYPE,
    'any.only': MESSAGES.AUTH.COMMON.MEMBERTYPE.WRONGTYPE
  })
});

export const signInValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
