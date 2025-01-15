import menuRepository from '../repositories/menu.repository.js';

class menuService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async createMenu(ownerId, menuName, content, price) {
    const restaurant = await this.#repository.findRestaurantByOwnerId(ownerId);
    if (!restaurant) return null;

    return await this.#repository.createMenu(
      restaurant.restaurantId,
      menuName,
      content,
      price,
    );
  }

  async getMenus(restaurantId) {
    const menus = await this.#repository.findMenusByRestaurantId(restaurantId);
    if (!menus.length) return null;

    console.log(`서비스 계층 : 음식점 ID로 매뉴 조회  :`, menus);
    return menus;
  }

  async updateMenu(ownerId, menuId, menuName, content, price) {
    const restaurant = await this.#repository.findRestaurantByOwnerId(ownerId);
    if (!restaurant) return null;

    const menu = await this.#repository.findMenuByIdAndRestaurantId(
      menuId,
      restaurant.restaurantId,
    );
    if (!menu) return null;

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
