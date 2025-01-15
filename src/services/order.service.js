import { MESSAGES } from '../constants/message.constant.js';
import OrderRepository from '../repositories/order.repository.js';

class OrderServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  // 주문 생성
  createOrder = async ({ userId, restaurantId, cartId, status }) => {
    try {
      let total_price = 0;

      // 1. 사용자 조회
      const user = await this.#repository.getUserById(userId);

      // 2. 메뉴 및 카운트갯수 조회(menuId , count 얻음)
      const menuList = await this.#repository.getMenuByCartId(cartId);
      if (!menuList || menuList.length === 0) {
        throw new Error('장바구니에 메뉴가 없습니다.');
      }
      // 3. 메뉴 가격을 찾아서 카운트 갯수를 곱한뒤 total_price 에 저장
      for (const menu of menuList) {
        const priceData = await this.#repository.getPriceByMenuId(menu.menuId);
        const price = priceData ? priceData.price : 0; // 가격이 없으면 0으로 설정

        if (isNaN(price)) {
          throw new Error(`메뉴 ID ${menu.menuId}의 가격을 찾을 수 없습니다.`);
        }

        if (typeof menu.count !== 'number' || menu.count <= 0) {
          throw new Error(`잘못된 카운트 값: ${menu.count}`);
        }

        total_price += menu.count * price;
      }
      // 4. 유저가 가지고 있는 포인트가 total_price 보다 적으면 에러
      if (user.point < total_price) {
        throw new Error(MESSAGES.ORDER.SERVICE.CREATE.NOT_POINT);
      }

      let remainingPoints = user.point - total_price;

      // 5. 결제 생성
      const payment = await this.#repository.createPayment({
        userId,
        restaurantId,
        total_price,
      });

      // 6. 주문 생성
      const order = await this.#repository.createOrder({
        userId,
        restaurantId,
        cartId,
        status,
        paymentId: payment.paymentId,
      });

      // 7. 유저 포인트 업데이트
      await this.#repository.updateUserPoints({
        userId,
        points: remainingPoints,
      });

      return { remainingPoints, order }; // 남은 포인트, 주문 반환
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
      /*
      // 1. 주문 정보 조회
      const order = await this.#repository.getOrderById(orderId);
      if (!order) {
        throw new Error(MESSAGES.ORDER.SERVICE.DELETE.NOT_FOUND);
      }
        */

      // 2. 결제 정보 조회
      const payment = await this.#repository.getPaymentById(paymentId);
      if (!payment) {
        throw new Error(MESSAGES.ORDER.SERVICE.DELETE.NOT_FOUND);
      }
      // 3. 포인트 복원
      await this.#repository.restoreUserPoints({
        userId: payment.userId,
        refundedAmount: payment.total_price,
      });

      // 4. 주문 및 결제 삭제
      await this.#repository.deleteOrder(orderId);
      await this.#repository.deletePayment(payment.paymentId);

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

  // 주문내역 조회
  orderInfoByU = async ({ userId }) => {
    try {
      const orderInfo = await this.#repository.getOrderIdByPaymentU({ userId });

      // const info = // { order, user, restaurant };
      //{data:[{order:{menu = []}},{user},{restaurant}]}

      return; //info;
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  };

  orderInfoByR = async ({ restaurantId }) => {
    try {
      const orderInfo = await this.#repository.getOrderIdByPaymentR({
        restaurantId,
      });

      // const info = // { order, user, restaurant };
      //{data:[{order:{menu = []}},{user},{restaurant}]}

      return; //info;
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  };
  // 주문상태 수정
  orderStatusUpdate = async (orderId, status) => {
    try {
      const statusType = [PREPARING, DELIVERING, DELIVERED, CANCELED];
      if (!status.include(statusType)) {
        throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
      }
      return this.#repository.editOrderStatus(orderId, status);
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  };
}

export default new OrderServices(OrderRepository);
