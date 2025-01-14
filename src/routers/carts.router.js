import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import cartsController from '../controllers/carts.controller.js';

const cartRouter = express.Router();


cartRouter.post(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.postCartDetail,
);

cartRouter.get(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.getCartDetail,
);


cartRouter.delete(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.deleteCartDetail,
);

export default cartRouter;
