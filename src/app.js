import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io'; // 수정된 부분
import http from 'http'; // Node.js 기본 내장 모듈
import cors from 'cors'; // CORS 모듈 import 추가
import fs from 'fs/promises'; // 파일 시스템 모듈로, Promise 기반으로 파일을 읽고 쓸 수 있게 해줌

import OrderRouter from './routers/order.routers.js';
import menuRouter from './routers/menu.router.js';
import paymentRouter from './routers/payment.router.js';
import reviewRouter from './routers/reviews.router.js';
import restaurantRouter from './routers/restaurants.router.js';
import addressRouter from './routers/address.router.js';
import getRestaurants from './routers/getRestaurants.routes.js';

import { errorHandler } from './middlewares/error-handler.middleware.js';
import { authRouter } from './routers/auth.router.js';

dotenv.config();

// express 객체 생성
const app = express();
// express http 서버 생성
const server = http.createServer(app);
// 생성된 http 서버에 Socket.IO를 바인딩 >> 실시간 통신 기능을 추
const io = new Server(server);
const PORT = 3000;

app.use('/public', express.static('public')); // public 폴더 내의 정적 파일을 제공
app.use(cors()); // CORS 미들웨어 추가 >>  다른 도메인에서의 요청을 허용
app.use(cookieParser());
app.use(express.json());

// app.use('/api', router);

app.use('/api', [
  menuRouter,
  paymentRouter,
  restaurantRouter,
  reviewRouter,
  addressRouter,
  OrderRouter,
  getRestaurants,
]);
app.use('/api/auth', authRouter);

app.use(errorHandler);

// 소켓 연결 관리
io.on('connection', (socket) => {
  socket.on('register', (data) => {
    socket.role = data.role; // 역할 저장 (owner 또는 user)
    socket.ownerId = data.ownerId;
    socket.userId = data.userId;

    if (socket.role === 'owner') {
      console.log(socket.role, 'connected', {
        ownerId: socket.ownerId,
      });
    } else if (socket.role === 'user') {
      console.log(socket.role, 'connected', {
        userId: socket.userId,
      });
    }
    socket.on('status_update', (data) => {
      if (socket.role === 'owner') {
        // 유저들에게 상태 업데이트 전달
        io.emit('status_update', { status: data.status });
      }
    });

    socket.on('disconnect', () => {
      if (socket.role === 'owner') {
        console.log(socket.role, ' user disconnected', {
          ownerId: socket.ownerId,
        });
      } else if (socket.role === 'user') {
        console.log(socket.role, ' user disconnected', {
          userId: socket.userId,
        });
      }
    });
  });
});

app.get('/owner', async (req, res) => {
  try {
    const data = await fs.readFile('./public/ownerOrder/owner.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});

// 다른 유저페이지
app.get('/user', async (req, res) => {
  try {
    const data = await fs.readFile('./public/userOrder/user.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});
server.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
