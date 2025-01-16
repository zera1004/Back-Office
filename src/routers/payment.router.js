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

// 주문진행
router.get('/myOrders', requireAccessToken, paymentController.orderInfo);

// 주문내역
router.get('/myPayments', requireAccessToken, paymentController.paymentInfo);

export default router;
