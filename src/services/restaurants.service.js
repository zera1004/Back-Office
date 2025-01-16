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
      throw new Error('사장님을 찾을 수 없습니다.');
    }

    if (ownerRestaurant) {
      throw new Error('업장은 한개만 등록 가능합니다.');
    }
    return await this.#repository.postRestaurant(data);
  };

  getOwnerRestaurant = async (data) => {
    const ownerRestaurant = await this.#repository.findOwnerRestaurant(data);

    if (!ownerRestaurant) {
      throw new Error('업장을 찾을 수 없습니다.');
    }

    return ownerRestaurant;
  };

  updateRestaurant = async (data) => {
    const findRestaurant = await this.#repository.findRestaurant(data);

    if (!findRestaurant) {
      throw new Error('업장을 찾을 수 없습니다.');
    }

    if (parseInt(data.ownerId) !== findRestaurant.ownerId) {
      throw new Error('업장 등록자가 아닙니다');
    }

    return await this.#repository.updateRestaurant(data);
  };

  deleteRestaurant = async (data) => {
    const findRestaurant = await this.#repository.findRestaurant(data);

    if (!findRestaurant) {
      throw new Error('업장을 찾을 수 없습니다.');
    }
    if (parseInt(data.ownerId) !== findRestaurant.ownerId) {
      throw new Error('업장 등록자가 아닙니다');
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
