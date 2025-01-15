import { MESSAGES } from '../constants/message.constant.js';
import restaurantsRepository from '../repositories/restaurants.repository.js';

class restaurantsService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }
  postRestaurant = async (data) => {
    const owner = await this.#repository.findOwner(data);
    const ownerRestaurant = await this.#repository.findOwnerRestaurant(data);

    if (!owner) {
      throw new Error(MESSAGES.RESTAURANT.COMMON.OWNER);
    }

    if (ownerRestaurant) {
      throw new Error(MESSAGES.RESTAURANT.CREATE.ONE_RESTAURANT);
    }
    return await this.#repository.postRestaurant(data);
  };

  getOwnerRestaurant = async (data) => {
    const ownerRestaurant = await this.#repository.findOwnerRestaurant(data);

    if (!ownerRestaurant) {
      throw new Error(MESSAGES.RESTAURANT.READ_LIST.NOT_FOUND_RESTAURANT);
    }

    return ownerRestaurant;
  };

  updateRestaurant = async (data) => {
    const findRestaurant = await this.#repository.findRestaurant(data);

    if (!findRestaurant) {
      throw new Error(MESSAGES.RESTAURANT.UPDATE.NOT_FOUND_RESTAURANT);
    }

    if (parseInt(data.ownerId) !== findRestaurant.ownerId) {
      throw new Error(MESSAGES.RESTAURANT.UPDATE.NOT_OWNER);
    }

    return await this.#repository.updateRestaurant(data);
  };

  deleteRestaurant = async (data) => {
    const findRestaurant = await this.#repository.findRestaurant(data);

    if (!findRestaurant) {
      throw new Error(MESSAGES.RESTAURANT.DELETE.NOT_FOUND_RESTAURANT);
    }
    if (parseInt(data.ownerId) !== findRestaurant.ownerId) {
      throw new Error(MESSAGES.RESTAURANT.DELETE.NOT_OWNER);
    }
    return await this.#repository.deleteRestaurant(data);
  };

  getAllRestaurant = async (data) => {
    const findRestaurant = await this.#repository.findRestaurant(data);

    if (!findRestaurant) {
      throw new Error(MESSAGES.RESTAURANT.DELETE.NOT_FOUND_RESTAURANT);
    }

    return findRestaurant;
  };
}

export default new restaurantsService(restaurantsRepository);
