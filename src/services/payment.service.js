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
    const restaurant = await this.#repository.findRestaurant(ownerId);
    if (!restaurant) return null;

    return {
      restaurantName: restaurant.restaurantName,
      totalPoint: restaurant.totalPoint,
    };
  }

  // 주문 진행 조회
  async orderInfo({ userId, restaurantId }) {
    console.log('주문현황 조회S');

    if (!userId && !restaurantId) {
      console.error('userId와 restaurantId가 모두 null 또는 undefined입니다.');
      return null;
    }

    const whereCondition = userId
      ? { userId: Number(userId) }
      : { restaurantId: Number(restaurantId) };

    // 문자열을 숫자로 변환
    //userId = Number(userId);
    // restaurantId = Number(restaurantId);

    console.log('주문현황 조회S1');
    const orderInfo =
      await this.#repository.getOrderIdByPayment(whereCondition);

    console.log('주문현황 조회S2');
    if (!orderInfo || orderInfo.length === 0) {
      throw new Error('Failed to read payment list');
    }
    console.log('해당값 있음');

    console.log('orderInfo : ', orderInfo);

    // orderInfo가 배열
    // 반환할 데이터 구성
    const data = orderInfo.map((v) => {
      const orderData = v.order.map((e2) => {
        // cartDetail이 존재하는지 확인
        const cartDetails = e2.cart?.cartDetail || [];
        const cartItems = cartDetails.map(
          (item) => `${item.menuName} - ${item.count}개`,
        );

        // 데이터 구조화
        return {
          menu: cartItems, // 메뉴 정보
          status: e2.status, // 주문 상태
        };
      });

      return {
        payment: {
          paymentId: v.paymentId,
          total_price: v.total_price,
          order_time: v.order_time,
        },
        order: orderData,
        user: {
          userName: v.user.name || '너도이름없냐',
          userAddress: v.user.address?.[0]?.address || '주소 없음',
        },
        restaurant: {
          restaurantAddress: v.restaurant.address,
          restaurantPhoneNumber: v.restaurant.phoneNumber,
          restaurantName: v.restaurant.restaurantName,
          averageStar: v.restaurant.averageStar || 0,
        },
      };
    });

    console.log('처리후 데이터 : ', data);

    return { data };
  }

  // 주문내역 조회
  async paymentInfo({ userId, restaurantId }) {
    if (!userId && !restaurantId) {
      console.error('userId와 restaurantId가 모두 null 또는 undefined입니다.');
      return null;
    }

    const whereCondition = userId
      ? { userId: Number(userId) }
      : { restaurantId: Number(restaurantId) };

    const paymentInfo =
      await this.#repository.getOrderIdByPayment(whereCondition);

    console.log('paymentInfo : ', paymentInfo);
    // 데이터 변환 및 구조화
    const data = paymentInfo.map((v) => {
      const cartDetails = v.order[0]?.cart?.cartDetail || []; // cartDetail이 배열
      const orderData = {};

      // 주문 데이터 가공
      if (cartDetails.length > 0) {
        if (v.order.length > 1) {
          orderData.menu = `${cartDetails[0].menuName} 외 ${v.order.length - 1}개`;
        } else {
          orderData.menu = `${cartDetails[0].menuName}`;
        }
        orderData.status = v.order[0].status;
      } else {
        orderData.menu = '메뉴 정보 없음';
      }

      return {
        payment: {
          paymentId: v.paymentId,
          total_price: v.total_price,
          order_time: v.order_time,
        },
        order: orderData,
        user: {
          userName: v.user.name || '이름 없음',
        },
        restaurant: {
          restaurantName: v.restaurant.restaurantName,
          averageStar: v.restaurant.averageStar || 0,
        },
      };
    });

    console.log('처리 후 데이터: ', data);

    return { data };
  }
}
export default new paymentService(paymentRepository);
