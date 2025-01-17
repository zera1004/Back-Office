// getRestaurants.routes.js
import express from 'express';
import GetRestaurantsController from '../controllers/getRestaurants.controller.js';

const router = express.Router();

// 랭킹 조회: 매출순
router.get('/restaurants/ranking', GetRestaurantsController.ranking);

// 전체 매장 조회
router.get('/restaurants/all', GetRestaurantsController.allRestaurant);

// 식당 유형별 매장 조회
// 쿼리 ?type = "korean"
router.get('/restaurants/type', GetRestaurantsController.restaurantByType);

// 주소기준 매장 조회
// 쿼리 ?address = "서울"
router.get(
  '/restaurants/address',
  GetRestaurantsController.restaurantByAddress,
);

// 매장 검색 (이름, 메뉴 포함)
// (쿼리 파라미터 타입 search(종합검색), name(상호명), menu(메뉴,설명) 사용)
// GET http://localhost:3000/api/restaurants/search?search=맛있는&type=name
// GET http://localhost:3000/api/restaurants/search?search=짜장&type=menu
// GET http://localhost:3000/api/restaurants/search?search=중국집
router.get('/restaurants/search', GetRestaurantsController.searchRestaurants);

// 지역/타입/검색을 한꺼번에 다루는 API가 필요. 없으면 넘어가고, 여러개면 and 사용하고

// 매장 상세 조회
router.get(
  '/restaurants/:restaurantId',
  GetRestaurantsController.restaurantDetail,
);

export default router;
