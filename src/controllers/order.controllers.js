import { MESSAGES } from '../constants/message.constant.js';
import OrderServices from '../services/order.services.js';

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
      return res.status(201).json({
        message: MESSAGES.ORDER.CREATE.SUCCEED`${result}원)`,
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
      return res.status(200).json({
        message: MESSAGES.ORDER.DELETE.SUCCEED`${result}원)`,
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
      return res.status(200).json({
        message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

export default new OrderControllers(OrderServices);
