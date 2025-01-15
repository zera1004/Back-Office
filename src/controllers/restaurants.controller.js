import restaurantsService from '../services/restaurants.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

class RestaurantController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  postRestaurant = async (req, res) => {
    const ownerId = parseInt(req.user.ownerId);
    const { address, phoneNumber, restaurantName, restaurantType } = req.body;
    try {
      const data = await this.#service.postRestaurant({
        ownerId,
        address,
        phoneNumber,
        restaurantName,
        restaurantType,
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '업장 등록에 성공하였습니다!', data: data });
    } catch (err) {
      if (err.message === '사장님을 찾을 수 없습니다.') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }

      if (err.message === '업장은 한개만 등록 가능합니다.') {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: err.message });
      }
      next(err);
    }
  };

  getOwnerRestaurant = async (req, res) => {
    const ownerId = parseInt(req.user.ownerId);
    try {
      const data = await this.#service.getOwnerRestaurant({ ownerId });
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '업장을 조회하였습니다', data: data });
    } catch (err) {
      if (err.message === '업장을 찾을 수 없습니다.') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }

      next(err);
    }
  };

  updateRestaurant = async (req, res) => {
    const ownerId = parseInt(req.user.ownerId);
    const { address, phoneNumber, restaurantName, restaurantType } = req.body;
    try {
      const getRestaurant = await this.#service.getOwnerRestaurant({ ownerId });
      const { restaurantId } = getRestaurant;
      const data = await this.#service.updateRestaurant({
        ownerId,
        restaurantId,
        address,
        phoneNumber,
        restaurantName,
        restaurantType,
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '업장이 수정되었습니다.', data: data });
    } catch (err) {
      if (err.message === '업장을 찾을 수 없습니다.') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }
      if (err.message === '업장 등록자가 아닙니다') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }

      next(err);
    }
  };

  deleteRestaurant = async (req, res) => {
    const ownerId = parseInt(req.user.ownerId);
    try {
      const getRestaurant = await this.#service.getOwnerRestaurant({ ownerId });
      const { restaurantId } = getRestaurant;
      const data = await this.#service.deleteRestaurant({
        ownerId,
        restaurantId,
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '업장이 삭제 되었습니다.', data: data });
    } catch (err) {
      if (err.message === '업장을 찾을 수 없습니다.') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }
      if (err.message === '업장 등록자가 아닙니다') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }

      next(err);
    }
  };

  getAllRestaurant = async (req, res) => {
    const restaurantId = Number(req.params.restaurantId);

    try {
      const data = await this.#service.getAllRestaurant({
        restaurantId,
      });

      return res.status(HTTP_STATUS.OK).json({
        data: data,
      });
    } catch (err) {
      if (err.message === MESSAGES.RESTAURANT.DELETE.NOT_FOUND_RESTAURANT) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }
      next(err);
    }
  };
}
export default new RestaurantController(restaurantsService);
