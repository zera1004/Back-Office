import cartsRepository from '../repositories/carts.repository.js';

class cartService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  postCartDetail = async (data) => {
    const { userId } = data;
    console.log(`userId! :`, userId);
    console.log(`data! :`, data);

    const { cartId } = await this.#repository.getCartIdbyUserId(userId);
    console.log(`카트 ID :`, cartId);

    // data에 cartId를 추가
    data.cartId = cartId;

    const checkUser = await this.#repository.checkUser(data);
    if (!checkUser) {
      throw new Error('접근권한이 없습니다.');
    }

    //다른 부분들은 조이 유효성 검사해서 들어간 값들 검증하면 좋을 듯?
    if (data.count === 0) {
      throw new Error('수량을 선택해 주세요');
    }

    console.log(`카트 ID 추가 후 데이터 :`, data);
    return await this.#repository.postCartDetail(data);
  };

  getCartDetail = async (data) => {
    const checkUser = await this.#repository.checkUser(data);

    if (!checkUser) {
      throw new Error('접근권한이 없습니다.');
    }

    const getCart = await this.#repository.getCartDetail(data);
    console.log(getCart);
    if (!getCart || getCart.length === 0) {
      throw new Error('장바구니가 비어있습니다');
    }

    let totalPrice = 0;
    const cartTotalPrice = getCart.map((item) => {
      const itemTotalPrice = item.Menu.price * item.count;
      // 전체 장바구니 총 가격 계산
      totalPrice += itemTotalPrice;

      return {
        cartDetailId: item.cartDetailId,
        menuName: item.Menu.menuName,
        price: item.Menu.price,
        count: item.count,
        // 개별 메뉴의 총 가격
        itemTotalPrice,
      };
    });
    console.log(totalPrice);
    return { cartTotalPrice, totalPrice };
  };

  deleteCartDetail = async (data) => {
    const checkUser = await this.#repository.checkUser(data);

    if (!checkUser) {
      throw new Error('접근권한이 없습니다.');
    }

    const findCartDetail = await this.#repository.findCartDetail(data);
    if (!findCartDetail) {
      throw new Error('해당 메뉴를 찾을 수 없습니다.');
    }

    return await this.#repository.deleteCartDetail(data);
  };
}

export default new cartService(cartsRepository);
