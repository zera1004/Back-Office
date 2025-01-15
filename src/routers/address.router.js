import addressController from '../controllers/address.controller.js';
import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const addressRouter = express.Router();

addressRouter.post(
  '/users/me/addresses',
  requireAccessToken,
  addressController.createAddress,
);
addressRouter.get(
  '/users/me/addresses',
  requireAccessToken,
  addressController.getAddress,
);
addressRouter.patch(
  '/users/me/addresses/:addressId',
  requireAccessToken,
  addressController.updateAddress,
);
addressRouter.delete(
  '/users/me/addresses/:addressId',
  requireAccessToken,
  addressController.deleteAddress,
);
addressRouter.get(
  '/users/me/addresses/:addressId',
  requireAccessToken,
  addressController.findAddressById,
);
addressRouter.patch(
  '/users/me/addresses/:addressId/main',
  requireAccessToken,
  addressController.setMainAddress,
);

export default addressRouter;
