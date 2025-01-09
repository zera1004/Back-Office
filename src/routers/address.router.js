import addressController from '../controllers/address.controller.js';
import express from 'express';

const addressRouter = express.Router();

addressRouter.post('/users/me/addresses', addressController.createAddress);
addressRouter.get('/users/me/addresses', addressController.getAddress);
addressRouter.patch(
  '/users/me/addresses/:addressId',
  addressController.updateAddress,
);
addressRouter.delete(
  '/users/me/addresses/:addressId',
  addressController.deleteAddress,
);

export default addressRouter;
