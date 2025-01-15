import { MESSAGES } from '../constants/message.constant.js';
import paymentService from '../services/payment.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
class paymentController {
  #service;

  constructor(service) {
    this.#service = service;
    this.getPayment = this.getPayment.bind(this);
    this.getRestaurantPoint = this.getRestaurantPoint.bind(this);
  }

  async getPayment(req, res, next) {
    try {
      const userId = parseInt(req.user.userId);

      const data = await this.#service.getPayment(userId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.PAYMENT.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRestaurantPoint(req, res, next) {
    try {
      const ownerId = parseInt(req.user.ownerId);

      const data = await this.#service.getRestaurantPoint(ownerId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        data: {
          restaurantName: data.restaurantName,
          totalPoint: data.totalPoint,
          reviewCount: data.reviewCount,
        },
      });
    } catch (error) {
      if (
        error.message === MESSAGES.PAYMENT.READ_LIST_POINT.NOT_FOUND_RESTAURANT
      ) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.PAYMENT.READ_LIST_POINT.FAIL,
        });
      }
      next(error);
    }
  }

  // 주문 진행
  async orderInfo(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      const data = await this.#service.orderInfo({ userId, restaurantId });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.PAYMENT.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      // 서비스 계층에서 발생한 에러를 다음 미들웨어로 전달
      next(error);
    }
  }

  // 주문 내역
  async paymentInfo(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      const data = await this.#service.paymentInfo({ userId, restaurantId });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.PAYMENT.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      // 서비스 계층에서 발생한 에러를 다음 미들웨어로 전달
      next(error);
    }
  }
}

export default new paymentController(paymentService);
