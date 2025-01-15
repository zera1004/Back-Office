import { prisma } from '../utils/prisma/index.js';

class orderRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  // 사용자 조회
  getUserById = async (userId) => {
    return await this.#orm.User.findFirst({
      where: { userId },
    });
  };

  // 메뉴아이디 및 카운터 조회
  getMenuByCartId = async (cartId) => {
    return await this.#orm.CartDetail.findMany({
      where: { cartId },
      select: { menuId: true, count: true },
    });
  };

  // 가격 조회
  getPriceByMenuId = async (menuId) => {
    return await this.#orm.Menu.findFirst({
      where: { menuId },
      select: { price: true },
    });
  };

  // 결제 생성
  createPayment = async ({ userId, restaurantId, total_price }) => {
    return await this.#orm.Payment.create({
      data: {
        userId,
        restaurantId,
        total_price,
      },
    });
  };
  // 주문 생성
  createOrder = async ({ userId, restaurantId, cartId, status, paymentId }) => {
    return await this.#orm.Order.create({
      data: {
        userId,
        restaurantId,
        cartId,
        status,
        paymentId,
      },
    });
  };

  // 결제 생성
  createPayment = async ({ userId, restaurantId, total_price, address }) => {
    return await this.#orm.Payment.create({
      data: {
        userId,
        restaurantId,
        total_price,
        address,
      },
    });
  };

  // 포인트 업데이트
  updateUserPoints = async ({ userId, points }) => {
    return await this.#orm.User.update({
      where: { userId },
      data: { point: points },
    });
  };

  /********* 주문조회 ************/

  // 주문정보 조회
  getOrderIdByPaymentU = async (userId) => {
    return await this.#orm.Payment.findUnique({
      where: { userId },
      orderBy: { paymentId },
      select: {
        order: {
          select: {
            cartId: { select: { count: true } },
            userId: { select: { address: true } },
            restaurantId: {
              select: {
                address: {
                  where: { mainAddress: true },
                  select: { address: true },
                },
              },
            },
          },
        },
      },
    });
  };

  getOrderIdByPaymentR = async ({ restaurantId }) => {
    return await this.#orm.Payment.findUnique({
      where: { restaurantId },
      orderBy: { paymentId },
      select: {
        order: {
          where: { restaurantId },
          select: {
            cartId: { select: { count: true } },
            userId: { select: { address: true } },
            restaurantId: {
              select: {
                address: {
                  where: { mainAddress: true },
                  select: { address: true },
                },
              },
            },
          },
        },
      },
    });
  };
  // 주문 상태 조회
  getOrderStatus = async (orderId) => {
    const order = await this.#orm.Order.findFirst({
      where: { orderId },
      select: { status: true },
    });
    return order?.status;
  };
  /*
  // 사용자 조회
  getUserById = async (userId) => {
    return await this.#orm.User.findFirst({
      where: { userId },
    });
  };

  // 가게 조회
  getRestaurantById = async (restaurantId) => {
    return await this.#orm.Restaurant.findFirst({
      where: { restaurantId },
    });
  };
*/
  // 결제 조회
  getPaymentById = async (paymentId) => {
    return await this.#orm.Payment.findFirst({
      where: { paymentId },
    });
  };

  /********* 주문취소 ************/
  // 포인트 복원
  restoreUserPoints = async ({ userId, refundedAmount }) => {
    return await this.#orm.User.update({
      where: { userId },
      data: {
        point: {
          increment: refundedAmount,
        },
      },
    });
  };

  // 주문 삭제
  deleteOrder = async (paymentId) => {
    return await this.#orm.Order.delete({
      where: { paymentId },
    });
  };

  // 결제 삭제
  deletePayment = async (paymentId) => {
    return await this.#orm.Payment.delete({
      where: { paymentId },
    });
  };

  // 주문상태 수정
  editOrderStatus = async (orderId, status) => {
    return await this.#orm.Order.update({
      where: { orderId },
      data: { status },
    });
  };
}

export default new orderRepository(prisma);
