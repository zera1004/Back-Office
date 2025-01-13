import menuRepository from '../repositories/menu.repository.js';

class menuService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async createMenu(ownerId, menuName, content, price, media) {
    const restaurant = await this.#repository.findRestaurantByOwnerId(ownerId);
    console.log(media);
    if (!restaurant) {
      return null;
    }

    return await this.#repository.createMenu(
      restaurant.restaurantId,
      menuName,
      content,
      price,
      media,
    );
  }

  async getMenus(restaurantId) {
    const menus = await this.#repository.findMenusByRestaurantId(restaurantId);
    if (!menus.length) return null;

    return menus;
  }

  async updateMenu(ownerId, menuId, menuName, content, price) {
    const restaurant = await this.#repository.findRestaurantByOwnerId(ownerId);
    if (!restaurant) {
      throw new Error('RESTAURANT_NOT_FOUND');
    }

    const menu = await this.#repository.findMenuByIdAndRestaurantId(
      menuId,
      restaurant.restaurantId,
    );
    if (!menu) {
      return null;
    }

    const updateData = {
      ...(menuName && { menuName }),
      ...(content && { content }),
      ...(price && { price }),
    };

    return await this.#repository.updateMenu(menuId, updateData);
  }

  async deleteMenu(ownerId, menuId) {
    const restaurant = await this.#repository.findRestaurantByOwnerId(ownerId);
    if (!restaurant) return null;

    const menu = await this.#repository.findMenuByIdAndRestaurantId(
      menuId,
      restaurant.restaurantId,
    );
    if (!menu) return null;

    return await this.#repository.deleteMenu(menuId);
  }
}

export default new menuService(menuRepository);
