import express from 'express';
import restaurantsController from '../controllers/restaurants.controller.js';
import { createRestaurantValidator } from '../middlewares/validators/create-restaurant-validator.middleware.js';
import { updateRestaurantValidator } from '../middlewares/validators/update-restaurant-validator.middleware.js';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const restaurantRouter = express.Router();

restaurantRouter.post(
  '/owners/me/restaurants',
  requireAccessToken,
  createRestaurantValidator,
  restaurantsController.postRestaurant,
);

restaurantRouter.get(
  '/owners/me/restaurants',
  requireAccessToken,
  restaurantsController.getOwnerRestaurant,
);

restaurantRouter.patch(
  '/owners/me/restaurants',
  requireAccessToken,
  updateRestaurantValidator,
  restaurantsController.updateRestaurant,
);

restaurantRouter.delete(
  '/owners/me/restaurants',
  requireAccessToken,
  restaurantsController.deleteRestaurant,
);

export default restaurantRouter;
