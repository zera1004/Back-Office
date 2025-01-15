import paymentRepository from '../repositories/payment.repository.js';

class paymentService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async getPayment(userId) {
    const payment = await this.#repository.findPayment(userId);
    return payment;
  }

  async getRestaurantPoint(ownerId) {
    console.log('레스토랑 id 조회S');
    const restaurant = await this.#repository.findRestaurant(ownerId);
    if (!restaurant) return null;

    return {
      restaurantName: restaurant.restaurantName,
      totalPoint: restaurant.totalPoint,
    };
  }

  // 주문 진행 조회
  async orderInfo({ userId, restaurantId }) {
    try {
      console.log('주문현황 조회S');
      if (!userId || !restaurantId) {
        throw new Error('INVALID_INPUT'); // 유효성 에러 발생
      }
      const orderInfo = await this.#repository.getOrderIdByPayment({
        userId,
        restaurantId,
      });

      // 주문 데이터 생성
      const orderData = orderInfo.order.cartId.cartDetail.map(
        (item) => `${item.menuName} - ${item.count}개`,
      );

      // 반환할 데이터 구성
      const data = {
        payment: {
          paymentId: orderInfo.order.paymentId,
          total_price: orderInfo.order.total_price,
          order_time: orderInfo.order.order_time,
          status: orderInfo.order.status,
        },
        order: orderData,
        user: {
          userName: orderInfo.order.userId.name,
          address: orderInfo.order.userId.address.fullAddress,
        },
        restaurant: {
          ownerId: orderInfo.order.restaurantId.ownerId,
          restaurantAddress: orderInfo.order.restaurantId.address,
          restaurantPhoneNumber: orderInfo.order.restaurantId.phoneNumber,
          restaurantName: orderInfo.order.restaurantId.restaurantName,
          averageStar: orderInfo.order.restaurantId.averageStar,
        },
      };

      return { data };
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  }

  // 주문내역 조회
  async paymentInfo({ userId, restaurantId }) {
    try {
      if (!userId || !restaurantId) {
        throw new Error('INVALID_INPUT'); // 유효성 에러 발생
      }
      const orderInfo = await this.#repository.getOrderIdByPayment({
        userId,
        restaurantId,
      });

      // 주문 데이터 생성
      const firstMenu = orderInfo.order.cartId.cartDetail[0].menuName;
      const additionalCount = orderInfo.order.cartId.cartDetail.length - 1;
      const menuData =
        additionalCount > 0
          ? `${firstMenu} 외 ${additionalCount}개`
          : `${firstMenu}`;

      const data = {
        payment: {
          paymentId: orderInfo.order.paymentId,
          total_price: orderInfo.order.total_price,
          order_time: orderInfo.order.order_time,
          statuse: orderInfo.order.order.status,
        },
        order: menuData,
        user: {
          userName: orderInfo.order.userId.name,
        },
        restorent: {
          restaurantName:
            orderInfo.order.restaurantId.restaurantId.restaurantName,
        },
      };
      return { data };
    } catch (error) {
      throw new Error(MESSAGES.ORDER.SERVICE.CHECK.NOT_ERROR);
    }
  }
}
export default new paymentService(paymentRepository);
