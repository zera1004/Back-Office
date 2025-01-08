// getRestaurants.routes.js
import express from 'express';
import GetRestaurantsController from '../controllers/getRestaurants.controller.js';

const router = express.Router();

// 랭킹 조회: 매출순
router.get('/ranking', GetRestaurantsController.ranking);

// 타입별 매장 조회
router.get('/type', GetRestaurantsController.restaurantByType);

// 지역별 매장 조회
router.get('/address', GetRestaurantsController.restaurantByAddress);

// 전체 매장 조회
router.get('/all', GetRestaurantsController.allRestaurant);

// 매장 검색 (이름, 메뉴 포함)
// (쿼리 파라미터 타입 search(종합검색), name(상호명), menu(메뉴,설명명) 사용)
// GET http://localhost:3000/api/restaurants/search?search=맛있는&type=name
// GET http://localhost:3000/api/restaurants/search?search=짜장&type=menu
// GET http://localhost:3000/api/restaurants/search?search=중국집
router.get('/search', GetRestaurantsController.searchRestaurants);

/*
// 매장 이름 검색  (쿼리 파라미터로 search 사용)
// GET http://localhost:3000/api/restaurants/search/name?search=맛있는
router.get('/search/name', GetRestaurantsController.searchRestaurantsByName);

// 메뉴 검색 (메뉴 이름, 메뉴 소개 포함)
// (쿼리 파라미터로 search 사용)
// GET http://localhost:3000/api/restaurants/search/menu?search=맛있는
router.get('/search/menu', GetRestaurantsController.searchRestaurantsByMenu);

// 종합 검색 (가게 이름, 메뉴 이름, 메뉴 소개 포함)
// (쿼리 파라미터로 search 사용)
// GET http://localhost:3000/api/restaurants/search?search=맛있는
router.get('/search', GetRestaurantsController.searchRestaurantsByNameMenu);
*/

// 매장 상세 조회
router.get('/:restaurantId', GetRestaurantsController.restaurantDetail);

export default router;
