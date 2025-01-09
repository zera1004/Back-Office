import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import OrderRouters from './routers/order.routers.js'

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = 3000;

app.use(express.json());

app.use('/api', [OrderRouters]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});