import express from "express"
import OrderControllers from "../controllers/order.controllers.js"
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router()

// JWT 토큰 추가 필요
router.post("/users/me/orders", requireAccessToken ,OrderControllers.createOrder)  // 주문하기
router.delete("/users/me/orders/:id", requireAccessToken ,OrderControllers.deleteOrder) // 주문취소
router.get("/users/me/orders/:id", requireAccessToken , OrderControllers.checkOrder) // 주문확인


export default router