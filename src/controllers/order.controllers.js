import OrderServices from '../services/order.services.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

class OrderControllers {
  #services;
  constructor(services) {
    this.#services = services;
  }

  // 주문 생성
  createOrder = async (req, res) => {
    const { restaurantId, cartId, status, total_price } = req.body;
    const { userId } = req.user;
    try {
      const result = await this.#services.createOrder({
        userId,
        restaurantId,
        cartId,
        status,
        total_price,
      });
      return res.status(HTTP_STATUS.CREATED).json({
        message: `주문이 완료되었습니다(남은금액:${result}원)`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문 취소
  deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.#services.deleteOrder({ id });
      return res.status(HTTP_STATUS.CREATED).json({
        message: `주문이 취소되었습니다(환불금액:${result}원)`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문 확인
  checkOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.#services.checkOrder({ id });
      return res.status(HTTP_STATUS.OK).json({
        message: `현재 배달상황은: ${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

export default new OrderControllers(OrderServices);
