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
import getRestaurants from './routers/getRestaurants.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();
const PORT = 3001;

// app.use(cors());
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

app.get("/hello_world" , (req,res) => {
  res.send("hello world i am hello")
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
