import express from "express"
import OrderControllers from "../controllers/order.controllers.js"
// JWT 토큰 추가 필요

const router = express.Router()

// JWT 토큰 추가 필요
router.post("/users/me/orders",OrderControllers.createOrder)  // 주문하기
router.delete("/users/me/orders/:id",OrderControllers.deleteOrder) // 주문취소
router.get("/users/me/orders/:id",OrderControllers.checkOrder) // 주문확인


export default router