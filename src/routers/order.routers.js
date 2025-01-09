import express from "express"
import OrderControllers from "../controllers/order.controllers.js"


const router = express.Router()


router.post("/users/me/orders",OrderControllers.createOrder)
router.delete("/users/me/orders/:id",OrderControllers.deleteOrder)
router.get("/users/me/orders/:id",OrderControllers.checkOrder)


export default router