import express from 'express';
import restaurantsController from '../controllers/restaurants.controller.js';

const restaurantRouter = express.Router();

restaurantRouter.post(
  '/owners/me/restaurants',
  restaurantsController.postRestaurant,
);

restaurantRouter.get(
  '/owners/:ownerId/me/restaurants',
  restaurantsController.getOwnerRestaurant,
);

restaurantRouter.patch(
  '/owners/:ownerId/me/restaurants/:restaurantId',
  restaurantsController.updateRestaurant,
);
restaurantRouter.delete(
  '/owners/:ownerId/me/restaurants/:restaurantId',
  restaurantsController.deleteRestaurant,
);

export default restaurantRouter;
