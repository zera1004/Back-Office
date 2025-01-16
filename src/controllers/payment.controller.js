// payment.controller.js
import { MESSAGES } from '../constants/message.constant.js';
import paymentService from '../services/payment.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
class paymentController {
  #service;

  constructor(service) {
    this.#service = service;
    this.getPayment = this.getPayment.bind(this);
    this.getRestaurantPoint = this.getRestaurantPoint.bind(this);
    this.orderInfo = this.orderInfo.bind(this); // 추가
    this.paymentInfo = this.paymentInfo.bind(this); // 추가
  }

  async getPayment(req, res, next) {
    try {
      const userId = parseInt(req.user.userId);

      const data = await this.#service.getPayment(userId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '결제 내역 조회 완료',
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
      if (error.message === 'RESTAURANT_NOT_FOUND') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: '레스토랑을 찾을 수 없습니다.',
        });
      }
      next(error);
    }
  }

  // 주문 진행
  async orderInfo(req, res, next) {
    try {
      console.log('주문현황 조회C');
      const { userId, restaurantId } = req.query;
      console.log(userId);
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
      const { userId, restaurantId } = req.query;
      console.log(userId);
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
