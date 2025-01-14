import orderService from '../services/order.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

class OrderController {
  #services;
  constructor(services) {
    this.#services = services;
  }

  // 주문 생성
  createOrder = async (req, res) => {
    const { restaurantId, cartId, status } = req.body;
    const { userId } = req.user;
    try {
      const result = await this.#services.createOrder({
        userId,
        restaurantId,
        cartId,
        status,
      });
      return res.status(HTTP_STATUS.CREATED).json({
        message:
          `${MESSAGES.ORDER.CREATE.SUCCEED} ` +
          `${result.remainingPoints}원, ` +
          `주문자: ${result.order.userId}, ` +
          `주문 번호: ${result.order.orderId}, ` +
          `결제 내역: ${result.order.paymentId}, ` +
          `레스토랑 ID: ${result.order.restaurantId}, ` +
          `카트 ID: ${result.order.cartId}, ` +
          `상태: ${result.order.status}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문 취소
  deleteOrder = async (req, res) => {
    const { id } = req.params;
    const orderId = Number(id);

    try {
      const result = await this.#services.deleteOrder({ orderId });
      return res.status(HTTP_STATUS.CREATED).json({
        message: `${MESSAGES.ORDER.DELETE.SUCCEED} ${result}원)`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문 확인
  checkOrder = async (req, res) => {
    const { id } = req.params;
    const orderId = Number(id);
    try {
      const result = await this.#services.checkOrder({ orderId });
      return res.status(HTTP_STATUS.OK).json({
        message: `${MESSAGES.ORDER.CHECK.SUCCEED} ${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

export default new OrderController(orderService);
