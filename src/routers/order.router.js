import express from 'express';
import orderController from '../controllers/order.controller.js';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router();

// 주문하기 <- 배송지 추가. 주문은 장바구니에서
// 시간나면 배달료 추가하기
router.post(
  '/users/me/orders',
  requireAccessToken,
  orderController.createOrder,
);

/*
// 주문 내역 조회 - 유저
router.get(
  '/users/me/orders/:id',
  requireAccessToken,
  orderController.orderInfoByUser,
);

// 주문내역 조회 - 가게
router.get(
  '/owners/me/orders/:id',
  requireAccessToken,
  orderController.orderInfoByRestaurant,
);
*/
/***
 * * 상태 수정 *
 * 준비중/준비완료/배달중/배달완료/취소
 * ***/

// 주문상태 수정 - 가게
router.patch(
  '/owners/me/orders/state/:id',
  requireAccessToken,
  orderController.editStatus,
);

/***
 * * 취소  - 상태만 바꾸기
 * id는 결제id*
 * ***/

// 주문취소 - 고객
router.delete(
  '/users/me/orders/:paymentId',
  requireAccessToken,
  orderController.deleteOrder,
);

// 주문취소 - 가게
router.delete(
  '/owner/me/orders/:paymentId',
  requireAccessToken,
  orderController.deleteOrder,
);

export default router;
