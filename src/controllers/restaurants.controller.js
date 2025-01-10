import { MESSAGES } from '../constants/message.constant.js';
import restaurantsService from '../services/restaurants.service.js';

class RestaurantController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  postRestaurant = async (req, res) => {
    const {
      ownerId,
      address,
      phoneNumber,
      restaurantName,
      restaurantType,
      totalPoint,
    } = req.body;
    try {
      const data = await this.#service.postRestaurant({
        ownerId,
        address,
        phoneNumber,
        restaurantName,
        restaurantType,
        totalPoint,
      });
      return res
        .status(201)
        .json({ message: MESSAGES.RESTAURANT.CREATE.SUCCEED, data: data });
    } catch (err) {
      if (err.message === MESSAGES.RESTAURANT.CREATE.NOT_FOUND_OWNER) {
        return res.status(404).json({ message: err.message });
      }

      if (err.message === MESSAGES.RESTAURANT.CREATE.ONE_RESTAURANT) {
        return res.status(403).json({ message: err.message });
      }
      next(err);
    }
  };

  getOwnerRestaurant = async (req, res) => {
    const { ownerId } = req.params;
    try {
      const data = await this.#service.getOwnerRestaurant({ ownerId });
      return res
        .status(200)
        .json({ message: MESSAGES.RESTAURANT.READ_LIST.SUCCEED, data: data });
    } catch (err) {
      if (err.message === MESSAGES.RESTAURANT.READ_LIST.NOT_FOUND_RESTAURANT) {
        return res.status(404).json({ message: err.message });
      }

      next(err);
    }
  };

  updateRestaurant = async (req, res) => {
    const { ownerId, restaurantId } = req.params;
    const { address, phoneNumber, restaurantName, restaurantType } = req.body;
    try {
      const data = await this.#service.updateRestaurant({
        ownerId,
        restaurantId,
        address,
        phoneNumber,
        restaurantName,
        restaurantType,
      });
      return res
        .status(201)
        .json({ message: MESSAGES.RESTAURANT.UPDATE.SUCCEED, data: data });
    } catch (err) {
      if (err.message === MESSAGES.RESTAURANT.UPDATE.NOT_FOUND_RESTAURANT) {
        return res.status(404).json({ message: err.message });
      }
      if (err.message === MESSAGES.RESTAURANT.UPDATE.NOT_OWNER) {
        return res.status(404).json({ message: err.message });
      }

      next(err);
    }
  };

  deleteRestaurant = async (req, res) => {
    const { ownerId, restaurantId } = req.params;
    try {
      const data = await this.#service.deleteRestaurant({
        ownerId,
        restaurantId,
      });
      return res
        .status(201)
        .json({ message: MESSAGES.RESTAURANT.DELETE.SUCCEED, data: data });
    } catch (err) {
      if (err.message === MESSAGES.RESTAURANT.DELETE.NOT_FOUND_RESTAURANT) {
        return res.status(404).json({ message: err.message });
      }
      if (err.message === MESSAGES.RESTAURANT.DELETE.NOT_OWNER) {
        return res.status(404).json({ message: err.message });
      }

      next(err);
    }
  };
}
export default new RestaurantController(restaurantsService);
