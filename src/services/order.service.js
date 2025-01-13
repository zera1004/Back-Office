import { MESSAGES } from '../constants/message.constant.js';
import OrderRepository from '../repositories/order.repositories.js';

class OrderServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  // 주문 생성
  createOrder = async ({
    userId,
    restaurantId,
    cartId,
    status,
    total_price,
  }) => {
    try {
      // 1. 사용자 포인트 확인 및 계산
      const user = await this.#repository.getUserById(userId);
      if (user.point < total_price) {
        throw new Error(MESSAGES.ORDER.SERVICE.CREATE.NOT_POINT);
      }
      const remainingPoints = user.point - total_price;

      // 2. 결제 생성
      const payment = await this.#repository.createPayment({
        userId,
        restaurantId,
        total_price,
      });

      // 3. 주문 생성
      const order = await this.#repository.createOrder({
        userId,
        restaurantId,
        cartId,
        status,
        paymentId: payment.paymentId,
      });

      // 4. 포인트 업데이트
      await this.#repository.updateUserPoints({
        userId,
        points: remainingPoints,
      });

      return remainingPoints; // 남은 포인트 반환
    } catch (error) {
      if (error.message === MESSAGES.ORDER.SERVICE.CREATE.NOT_POINT) {
        throw error;
      } else {
        throw new Error(MESSAGES.ORDER.SERVICE.CREATE.NOT_ERROR);
      }
    }
  };

  // 주문 삭제
  deleteOrder = async ({ orderId }) => {
    try {
      // 1. 주문 정보 조회
      const order = await this.#repository.getOrderById(orderId);
      if (!order) {
        throw new Error(MESSAGES.ORDER.SERVICE.DELETE.NOT_FOUND);
      }

      // 2. 결제 정보 조회
      const payment = await this.#repository.getPaymentById(order.paymentId);

      // 3. 포인트 복원
      await this.#repository.restoreUserPoints({
        userId: order.userId,
        refundedAmount: payment.total_price,
      });

      // 4. 주문 및 결제 삭제
      await this.#repository.deletePayment(payment.paymentId);
      await this.#repository.deleteOrder(orderId);

      return payment.total_price; // 환불된 금액 반환
    } catch (error) {
      if (error.message === MESSAGES.ORDER.SERVICE.DELETE.NOT_FOUND) {
        throw error;
      } else {
        throw new Error(MESSAGES.ORDER.SERVICE.DELETE.NOT_ERROR);
      }
    }
  };

  // 주문 상태 확인
  checkOrder = async ({ orderId }) => {
    try {
      const status = await this.#repository.getOrderStatus(orderId);
      const statusMapping = {
        PREPARING: MESSAGES.ORDER.SERVICE.CHECK.READY,
        DELIVERING: MESSAGES.ORDER.SERVICE.CHECK.GO,
        DELIVERED: MESSAGES.ORDER.SERVICE.CHECK.FINISH,
      };
      return statusMapping[status] || MESSAGES.ORDER.SERVICE.CHECK.NOT_KNOW; // 상태 반환
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  };
}

export default new orderService(orderRepository);
