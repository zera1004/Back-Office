import express from "express"
import OrderController from "../controllers/order.controller.js"
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router()


router.post("/users/me/orders", requireAccessToken ,OrderController.createOrder)  // 주문하기

router.delete("/users/me/orders/:id", requireAccessToken ,OrderController.deleteOrder) // 주문취소

router.get("/users/me/orders/:id", requireAccessToken , OrderController.checkOrder) // 주문확인


export default router