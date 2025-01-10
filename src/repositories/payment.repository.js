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
    return await this.#orm.restaurant.findFirst({
      where: { ownerId },
      select: {
        restaurantId: true,
        restaurantName: true,
        totalPoint: true,
      },
    });
  }
}

export default new paymentRepository(prisma);
