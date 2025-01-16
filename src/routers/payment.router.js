import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.get('/users/me/payments', requireAccessToken, (res, req, next) => {
  paymentController.getPayment(res, req, next);
});

router.get('/owners/me/payments', requireAccessToken, (res, req, next) => {
  paymentController.getRestaurantPoint(res, req, next);
});

export default router;
