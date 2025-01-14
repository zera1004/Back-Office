import express from 'express';
import orderController from '../controllers/order.controller.js';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router();

// 주문하기
router.post(
  '/users/me/orders',
  requireAccessToken,
  orderController.createOrder,
);

// 주문취소
router.delete(
  '/users/me/orders/:id',
  requireAccessToken,
  orderController.deleteOrder,
);

// 사용해야 할까?
router.get(
  '/users/me/orders/:id',
  requireAccessToken,
  orderController.checkOrder,
); // 주문확인

// 주문 내역 조회 - 유저
router.get(
  '/users/me/orders/:id',
  requireAccessToken,
  orderController.orderInfo,
);

// 주문내역 조회 - 가게
router.get(
  '/owners/me/orders/:id',
  requireAccessToken,
  orderController.orderInfo,
);

// 주문상태 수정 - 유저
router.patch(
  '/users/me/orders/state/:id',
  requireAccessToken,
  orderController.editStatus,
);

// 주문상태 수정 - 가게
router.patch(
  '/owners/me/orders/state/:id',
  requireAccessToken,
  orderController.editStatus,
);

export default router;
