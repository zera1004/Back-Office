import { MESSAGES } from '../constants/message.constant.js';
import OrderRepository from '../repositories/order.repository.js';

class orderService {
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
        throw new Error('음식을 주문하기 위한 포인트가 부족합니다.');
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
      if (error.message === '음식을 주문하기 위한 포인트가 부족합니다.') {
        throw error;
      } else {
        throw new Error('주문 생성중 에러가 발생 담당자한테 문의할것');
      }
    }
  };

  // 주문 삭제
  deleteOrder = async ({ orderId }) => {
    try {
      // 1. 주문 정보 조회
      const order = await this.#repository.getOrderById(orderId);
      if (!order) {
        throw new Error('주문을 찾을 수 없습니다.');
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
      if (error.message === '주문을 찾을 수 없습니다.') {
        throw error;
      } else {
        throw new Error('주문 취소 중 오류가 발생 담당자한테 문의할것.');
      }
    }
  };

  // 주문 상태 확인
  checkOrder = async ({ orderId }) => {
    try {
      const status = await this.#repository.getOrderStatus(orderId);
      const statusMapping = {
        PREPARING: '준비중',
        DELIVERING: '배달중',
        DELIVERED: '배달완료',
      };
      return statusMapping[status] || '알 수 없음'; // 상태 반환
    } catch (error) {
      throw new Error(
        '배달 상황을 확인하는 중 오류가 발생 담당자한테 문의할것.',
      );
    }
  };
}

export default new orderService(OrderRepository);
