import { prisma } from '../utils/prisma/index.js';

class CartRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }
  //카트 정보와 유저 정보가 일치하는지 확인
  checkUser = async (data) => {
    console.log(data);
    return await this.#orm.cart.findFirst({
      where: { userId: parseInt(data.userId), cartId: parseInt(data.cartId) },
    });
  };

  getCartIdbyUserId = async (data) => {
    console.log(data);
    return await this.#orm.cart.findFirst({
      where: { userId: parseInt(data) },
      select: { cartId: true },
    });
  };

  //장바구니 메뉴 등록하기
  postCartDetail = async (data) => {
    return await this.#orm.cartDetail.create({
      data: {
        cartId: +data.cartId,
        menuId: +data.menuId,
        restaurantId: +data.restaurantId,
        count: data.count,
      },
    });
  };

  // 장바구니 조회하기
  getCartDetail = async (data) => {
    return await this.#orm.cartDetail.findMany({
      where: { cartId: parseInt(data.cartId) },
      select: {
        cartDetailId: true,
        menuId: true,
        Menu: {
          select: {
            menuName: true,
            price: true,
          },
        },
        count: true,
      },
    });
  };

  // 카트 디테일값이 존재하는지 확인하기
  findCartDetail = async (data) => {
    return await this.#orm.cartDetail.findFirst({
      where: { cartDetailId: parseInt(data.cartDetailId) },
    });
  };

  //장바구니 메뉴 삭★제
  deleteCartDetail = async (data) => {
    return await this.#orm.cartDetail.delete({
      where: { cartDetailId: parseInt(data.cartDetailId) },
    });
  };
}

export default new CartRepository(prisma);
