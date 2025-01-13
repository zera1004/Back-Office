import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import orderRouter from './routers/order.router.js';
import menuRouter from './routers/menu.router.js';
import paymentRouter from './routers/payment.router.js';
import reviewRouter from './routers/reviews.router.js';
import restaurantRouter from './routers/restaurants.router.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { authRouter } from './routers/auth.router.js';
import addressRouter from './routers/address.router.js';
import cartRouter from './routers/carts.router.js';

import getRestaurants from './routers/getRestaurants.routes.js';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

// app.use('/api', router);

app.use('/api', [
  menuRouter,
  paymentRouter,
  restaurantRouter,
  reviewRouter,
  addressRouter,
  orderRouter,
  getRestaurants,
  cartRouter,
]);
app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
