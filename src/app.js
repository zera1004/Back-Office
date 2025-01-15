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
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import getRestaurants from './routers/getRestaurants.routes.js';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    message: err.message || '서버 내부 오류가 발생했습니다.',
  });
});

// 로그인 페이지 라우트
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'example.html'));
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 메인 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'home.html'));
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
