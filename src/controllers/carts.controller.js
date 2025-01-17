import { HTTP_STATUS } from '../constants/http-status.constant.js';
import cartsService from '../services/carts.service.js';

class CartController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  postCartDetail = async (req, res) => {
    const { userId } = req.user;
    // const { cartId } = req.params;
    const { cart } = req.body;

    try {
      // 결과를 담을 배열
      const results = [];

      // cart 배열을 순회하면서 DB에 삽입
      for (const item of cart) {
        const { menuId, restaurantId, count } = item;

        // 예: 서비스 계층에 넘길 때도 하나씩 처리
        //     userId나 기타 값도 같이 넘겨야 하는 경우가 많음
        const data = await this.#service.postCartDetail({
          userId,
          menuId,
          restaurantId,
          count,
        });
        results.push(data); // 각 등록 결과 푸시
      }

      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '장바구니 메뉴 등록에 성공하였습니다.' });
    } catch (err) {
      if (err.message === '접근권한이 없습니다.') {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: err.message });
      }

      if (err.message === '수량을 선택해 주세요') {
        console.log('--------------');
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: err.message });
      }
    }
  };

  getCartDetail = async (req, res) => {
    const { userId } = req.user;
    const { cartId } = req.params;
    try {
      const data = await this.#service.getCartDetail({
        userId,
        cartId,
      });
      return res.status(HTTP_STATUS.OK).json({
        message: '장바구니를 조회하였습니다',
        data: data,
      });
    } catch (err) {
      if (err.message === '접근권한이 없습니다.') {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: err.message });
      }
      if (err.message === '장바구니가 비어있습니다') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }
    }
  };

  deleteCartDetail = async (req, res) => {
    const { userId } = req.user;
    const { cartId } = req.params;
    const { cartDetailId } = req.body;
    console.log(`클라이언트에서 준 값`, userId, cartId, cartDetailId);
    try {
      const data = await this.#service.deleteCartDetail({
        userId,
        cartId,
        cartDetailId,
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '장바구니 메뉴가 삭제되었습니다.', data: data });
    } catch (err) {
      if (err.message === '접근권한이 없습니다.') {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: err.message });
      }
      if (err.message === '해당 메뉴를 찾을 수 없습니다.') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: err.message });
      }
    }
  };
}

export default new CartController(cartsService);
