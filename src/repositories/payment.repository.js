import { prisma } from '../utils/prisma/index.js';

class paymentRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }
  // 유저 결제 내역 조회
  async findPayment(userId) {
    return await this.#orm.payment.findMany({
      where: { userId },
      //   select: {
      //     restaurantId: true,
      //     tatal_price: true,
      //     order_time: true,
      //   },
    });
  }
  // 레스토랑 id 조회
  async findRestaurant(ownerId) {
    console.log('레스토랑 id 조회R');
    return await this.#orm.restaurant.findFirst({
      where: { ownerId },
      select: {
        restaurantId: true,
        restaurantName: true,
        totalPoint: true,
      },
    });
  }

  // 주문 진행 현황 조회
  async getOrderIdByPayment({ userId, restaurantId }) {
    console.log('주문현황 조회');
    const whereCondition = userId ? { userId } : { restaurantId };

    return await this.#orm.Payment.findMany({
      where: whereCondition,
      orderBy: { paymentId },
      select: {
        order: {
          select: {
            paymentId: true,
            restaurantId: {
              select: {
                ownerId: true,
                address: true,
                phoneNumber: true, // 식당전화
                restaurantName: true,
                averageStar: true,
              },
            },
            userId: {
              select: {
                name: true,
                address: {
                  where: { mainAddress: true },
                  select: { address: true },
                },
              },
            },
            total_price: true,
            order_time: true,
            order: {
              select: {
                cartId: {
                  select: {
                    cartDetail: { select: { menuId: true, count: true } },
                  },
                },
                status: true,
              },
            },
          },
        },
      },
    });
  }

  // 상태수정은 오더에서
}

export default new paymentRepository(prisma);
