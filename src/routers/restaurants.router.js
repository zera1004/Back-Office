import express from 'express';
import restaurantsController from '../controllers/restaurants.controller.js';
import { createRestaurantValidator } from './create-restaurant-validator.middleware.js';
import { updateRestaurantValidator } from './update-restaurant-validator.middleware.js';

const restaurantRouter = express.Router();

restaurantRouter.post(
  '/owners/me/restaurants',
  createRestaurantValidator,
  restaurantsController.postRestaurant,
);

restaurantRouter.get(
  '/owners/:ownerId/me/restaurants',
  restaurantsController.getOwnerRestaurant,
);

restaurantRouter.patch(
  '/owners/:ownerId/me/restaurants/:restaurantId',
  updateRestaurantValidator,
  restaurantsController.updateRestaurant,
);

restaurantRouter.delete(
  '/owners/:ownerId/me/restaurants/:restaurantId',
  restaurantsController.deleteRestaurant,
);

export default restaurantRouter;
