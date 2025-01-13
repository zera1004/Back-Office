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

      const data = await this.#service.createMenu(
        ownerId,
        menuName,
        content,
        price,
      );

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
<<<<<<< HEAD
          message: MESSAGES.MENU.CREATE.NOT_FOUND,
=======
          status: HTTP_STATUS.NOT_FOUND,
          message: '레스토랑을 찾을 수 없습니다.',
>>>>>>> parent of 816e98b (Merge pull request #12 from zera1004/feature/kdh/address)
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
<<<<<<< HEAD
        message: MESSAGES.MENU.CREATE.SUCCEED,
=======
        status: HTTP_STATUS.CREATED,
        message: '메뉴등록이 완료되었습니다',
>>>>>>> parent of 816e98b (Merge pull request #12 from zera1004/feature/kdh/address)
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
<<<<<<< HEAD
          message: MESSAGES.MENU.GET.NOT_FOUND,
=======
          status: HTTP_STATUS.NOT_FOUND,
          message: '메뉴를 찾을 수 없습니다.',
>>>>>>> parent of 816e98b (Merge pull request #12 from zera1004/feature/kdh/address)
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

      const data = await this.#service.updateMenu(
        ownerId,
        menuId,
        menuName,
        content,
        price,
      );

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
<<<<<<< HEAD
          message: MESSAGES.MENU.UPDATE.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.MENU.UPDATE.SUCCEED,
=======
          status: HTTP_STATUS.NOT_FOUND,
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴가 수정되었습니다.',
>>>>>>> parent of 816e98b (Merge pull request #12 from zera1004/feature/kdh/address)
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
<<<<<<< HEAD
          message: MESSAGES.MENU.DELETE.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.MENU.DELETE.SUCCEED,
=======
          status: HTTP_STATUS.NOT_FOUND,
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴가 삭제되었습니다.',
>>>>>>> parent of 816e98b (Merge pull request #12 from zera1004/feature/kdh/address)
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new menuController(menuService);
