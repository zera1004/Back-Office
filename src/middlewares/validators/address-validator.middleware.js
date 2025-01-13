import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const createSchema = Joi.object({
  address: Joi.string().trim().required().messages({
    'any.required': MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED,
    'string.empty': MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED,
  }),
  addressName: Joi.string().trim().required().messages({
    'any.required': MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED,
    'string.empty': MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED,
  }),
});

const updateSchema = Joi.object({
  addressId: Joi.number().required().messages({
    'any.required': MESSAGES.ADDRESS.COMMON.NOT_FOUND_USER,
  }),
  address: Joi.string().trim().required().messages({
    'any.required': MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED,
    'string.empty': MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED,
  }),
  addressName: Joi.string().trim().required().messages({
    'any.required': MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED,
    'string.empty': MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED,
  }),
});

export const createAddressValidator = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const updateAddressValidator = async (req, res, next) => {
  try {
    await updateSchema.validateAsync({
      ...req.body,
      ...req.params,
    });
    next();
  } catch (error) {
    next(error);
  }
};
