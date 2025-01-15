import menuService from '../services/menu.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class menuController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  async createMenu(req, res, next) {
    try {
      const ownerId = parseInt(req.user.ownerId);
      const { menuName, content, price } = req.body;
      const mediaUrl = req.file ? req.file.location : null;

      const data = await this.#service.createMenu(
        ownerId,
        menuName,
        content,
        price,
        mediaUrl,
      );

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.MENU.CREATE.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.MENU.GET.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.MENU.GET.SUCCEED,
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
      const mediaUrl = req.file ? req.file.location : null;

      const data = await this.#service.updateMenu(
        ownerId,
        menuId,
        menuName,
        content,
        price,
        mediaUrl,
      );

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.MENU.UPDATE.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.MENU.DELETE.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.MENU.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new menuController(menuService);
