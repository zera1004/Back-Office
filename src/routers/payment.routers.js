import express from "express"
import PaymentControllers from "../controllers/payment.controllers.js"
// JWT 토큰 추가 필요

const router = express.Router()


router.post("/users/me/payments",PaymentControllers.payment) // JWT 토큰 추가 필요


export default router