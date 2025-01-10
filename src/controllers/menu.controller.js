import { MESSAGES } from '../constants/message.constant.js';
import menuService from '../services/menu.service.js';

class menuController {
  #service;

  constructor(service) {
    this.#service = service;
    this.createMenu = this.createMenu.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
  }

  async createMenu(req, res, next) {
    try {
      const ownerId = parseInt(req.user.ownerId);
      const { menuName, content, price } = req.body;

      const data = await this.#service.createMenu(
        ownerId,
        menuName,
        content,
        price,
      );

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: MESSAGES.MENU.CREATE.NOT_FOUND_RESTAURANT,
        });
      }

      return res.status(200).json({
        status: 200,
        message: MESSAGES.MENU.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMenus(req, res, next) {
    try {
      const restaurantId = parseInt(req.params.restaurantId);

      const data = await this.#service.getMenus(restaurantId);

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: MESSAGES.MENU.READ_LIST.NOT_FOUND_MENU,
        });
      }

      return res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMenu(req, res, next) {
    try {
      const ownerId = parseInt(req.user.ownerId);
      const menuId = parseInt(req.params.menuId);
      const { menuName, content, price } = req.body;

      const data = await this.#service.updateMenu(
        ownerId,
        menuId,
        menuName,
        content,
        price,
      );

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: MESSAGES.MENU.UPDATE.NOT_FOUND_MENU,
        });
      }

      return res.status(200).json({
        status: 200,
        message: MESSAGES.MENU.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMenu(req, res, next) {
    try {
      const ownerId = parseInt(req.user.ownerId);
      const menuId = parseInt(req.params.menuId);

      const data = await this.#service.deleteMenu(ownerId, menuId);

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: MESSAGES.MENU.DELETE.NOT_FOUND_MENU,
        });
      }

      return res.status(200).json({
        status: 200,
        message: MESSAGES.MENU.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new menuController(menuService);
