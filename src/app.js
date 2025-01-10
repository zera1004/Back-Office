import express, { Router } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import menuRouter from './routers/menu.router.js';
import paymentRouter from './routers/payment.router.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { authRouter } from './routers/auth.router.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api', [menuRouter, paymentRouter]);
app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
