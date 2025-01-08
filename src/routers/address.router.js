import addressController from '../controllers/address.controller.js';
import express from 'express';

const router = express.Router();

router.post('/users/me/addresses', addressController.createAddress);
router.get('/users/me/addresses', addressController.getAddress);
router.patch('/users/me/addresses/:addressId', addressController.updateAddress);
router.delete(
  '/users/me/addresses/:addressId',
  addressController.deleteAddress,
);

export default router;
