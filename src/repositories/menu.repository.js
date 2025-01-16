import { prisma } from '../utils/prisma/index.js';

class menuRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  async findRestaurantByOwnerId(ownerId) {
    return await this.#orm.restaurant.findFirst({
      where: { ownerId },
      select: { restaurantId: true },
    });
  }

  async createMenu(restaurantId, menuName, content, price, media) {
    const menu = await this.#orm.menu.create({
      data: {
        restaurantId,
        menuName,
        content,
        price: parseInt(price),
        media,
      },
    });
    return menu;
  }

  async findMenusByRestaurantId(restaurantId) {
    return await this.#orm.menu.findMany({
      where: { restaurantId },
      select: {
        menuId: true,
        restaurantId: true,
        menuName: true,
        price: true,
        content: true,
      },
    });
  }

  async findMenuByIdAndRestaurantId(menuId, restaurantId) {
    return await this.#orm.menu.findFirst({
      where: {
        menuId,
        restaurantId,
      },
    });
  }

  async updateMenu(menuId, updateData) {
    return await this.#orm.menu.update({
      where: { menuId },
      data: updateData,
    });
  }

  async deleteMenu(menuId) {
    return await this.#orm.menu.delete({
      where: { menuId },
    });
  }
}

export default new menuRepository(prisma);
