import paymentService from '../services/payment.service.js';

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
      return res.status(200).json({
        status: 200,
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

      return res.status(200).json({
        status: 200,
        data: {
          restaurantName: data.restaurantName,
          totalPoint: data.totalPoint,
          reviewCount: data.reviewCount,
        },
      });
    } catch (error) {
      if (error.message === 'RESTAURANT_NOT_FOUND') {
        return res.status(404).json({
          status: 404,
          message: '레스토랑을 찾을 수 없습니다.',
        });
      }
      next(error);
    }
  }
}

export default new paymentController(paymentService);
