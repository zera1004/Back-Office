import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const cartRouter = express.Router();

cartRouter.post('/users/me/carts/:id', async (req, res, next) => {});

cartRouter.get('/users/me/carts/:id', async (req, res, next) => {});

export default restaurantRouter;
