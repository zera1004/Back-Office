import express from 'express';
// import { authorization } from '../middlewares/authorization.middleware.js';
import paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.get(
  '/users/me/payments',
  //authorization,
  paymentController.getPayment,
);

router.get(
  '/owners/me/payments',
  //authorization,
  paymentController.getRestaurantPoint,
);

export default router;
