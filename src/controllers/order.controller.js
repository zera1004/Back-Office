import orderService from '../services/order.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class OrderController {
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
      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.ORDER.DELETE.SUCCEED`${result}원)`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문 확인 - 안씀
  checkOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.#services.checkOrder({ id });
      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  // 주문확인
  orderInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.#services.orderInfo({ id });
      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };

  //주문상태 수정
  editStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      orderStatusUpdate(id, status);
      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

export default new OrderController(orderService);
