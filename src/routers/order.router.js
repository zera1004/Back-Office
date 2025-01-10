import express from "express"
import orderController from "../controllers/order.controller.js"
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router()


router.post("/users/me/orders", requireAccessToken ,orderController.createOrder)  // 주문하기

router.delete("/users/me/orders/:id", requireAccessToken ,orderController.deleteOrder) // 주문취소

router.get("/users/me/orders/:id", requireAccessToken , orderController.checkOrder) // 주문확인


export default router