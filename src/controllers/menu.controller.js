import menuService from '../services/menu.service.js';

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
        return res.status(404).json({
          status: 404,
          message: '레스토랑을 찾을 수 없습니다.',
        });
      }

      return res.status(200).json({
        status: 200,
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
        return res.status(404).json({
          status: 404,
          message: '메뉴를 찾을 수 없습니다.',
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
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(200).json({
        status: 200,
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
        return res.status(404).json({
          status: 404,
          message: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
        });
      }

      return res.status(200).json({
        status: 200,
        message: '메뉴가 삭제되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new menuController(menuService);
