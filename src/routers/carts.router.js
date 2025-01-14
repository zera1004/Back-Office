import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import cartsController from '../controllers/carts.controller.js';

const cartRouter = express.Router();

//장바구니에 메뉴 추가 -- 한명의 유저는 회원가입시 하나의 장바구니를 생성해야함
// 장바구니 디테일 테이블에서 메뉴아이디와 레스토랑 아이디를 불러옴 count로 개수를 수정함
// 예를들어 장바구니 테이블에 디테일 아이디 1번 카트아이디 1번 메뉴아이디 2번 레스토랑 아이디 2번으로 갯수는 3개로 추가하면
// 장바구니에 메뉴는 같은 레스토랑 메뉴만 담을 수 있습니다.
// 지금은 카트 아이디를 파람스로 받지만 월요일에 팀원들과 상의 후에 유저 테이블에 카트 id 추가하는게 좋을듯? 그리고 장바구니 테이블은 없애버리는거지 상의를 해보고 정합시다 이건
cartRouter.post(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.postCartDetail,
);

cartRouter.get(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.getCartDetail,
);


cartRouter.delete(
  '/users/me/carts/:cartId',
  requireAccessToken,
  cartsController.deleteCartDetail,
);

export default cartRouter;
