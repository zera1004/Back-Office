import menuService from '../services/menu.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

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
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: '레스토랑을 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴등록이 완료되었습니다',
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
          status: HTTP_STATUS.NOT_FOUND,
          message: '메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
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
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴가 수정되었습니다.',
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
          status: HTTP_STATUS.NOT_FOUND,
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴가 삭제되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new menuController(menuService);
