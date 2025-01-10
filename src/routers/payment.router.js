import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.get(
  '/users/me/payments',
  requireAccessToken,
  paymentController.getPayment,
);

router.get(
  '/owners/me/payments',
  requireAccessToken,
  paymentController.getRestaurantPoint,
);

export default router;
