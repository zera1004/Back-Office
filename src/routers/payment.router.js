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

// 주문진행 - 유저
router.get(
  '/users/me/getOrders/user/:userId',
  requireAccessToken,
  paymentController.getRestaurantPoint,
);

// 주문진행 - 가게
router.get(
  '/owners/me/getOrders/restorunts/:restoruntsId',
  requireAccessToken,
  paymentController.getRestaurantPoint,
);

// 주문내역 - 유저
router.get(
  '/users/me/getPayments/user/:userId',
  requireAccessToken,
  paymentController.getRestaurantPoint,
);
// 주문내역 - 가게
router.get(
  '/owners/me/getPayments/restorunts/:restoruntsId',
  requireAccessToken,
  paymentController.getRestaurantPoint,
);

export default router;
