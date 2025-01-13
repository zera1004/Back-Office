import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const schema = Joi.object({
  menuName: Joi.string().max(20).trim().pattern(/\S/).required().messages({
    'any.required': MESSAGES.MENU.COMMON.MENUNAME.REQUIRED,
    'string.empty': MESSAGES.MENU.COMMON.MENUNAME.REQUIRED,
    'string.max': MESSAGES.MENU.COMMON.MENUNAME.TOO_LONG,
  }),
  price: Joi.number().integer().min(0).required().messages({
    'any.required': MESSAGES.MENU.COMMON.PRICE.REQUIRED,
    'number.empty': MESSAGES.MENU.COMMON.PRICE.REQUIRED,
    'number.min': MESSAGES.MENU.COMMON.PRICE.TOO_LOW,
  }),
  content: Joi.string().max(100).trim().pattern(/\S/).required().messages({
    'any.required': MESSAGES.MENU.COMMON.CONTENT.REQUIRED,
    'string.empty': MESSAGES.MENU.COMMON.CONTENT.REQUIRED,
    'string.max': MESSAGES.MENU.COMMON.CONTENT.TOO_LONG,
  }),
});

export const menuValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
