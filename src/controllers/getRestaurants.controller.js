// getRestaurants.controller.js
// 간단하게 서비스 호출만
import GetRestaurantsService from '../services/getRestaurants.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

class GetRestaurantsController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  // 랭킹조회 : 매출순
  ranking = async (req, res) => {
    console.log('Controller ranking');
    try {
      const ranking = await this.#service.ranking();
      if (!ranking || ranking.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '매장 매출 정보가 존재하지 않습니다.' });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: '매출 상위 20위',
        data: ranking,
      });
    } catch (error) {
      console.error('Error in ranking:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };

  // 식당 타입별
  // restaurantByType = async (type) => {console.log("Controller
  restaurantByType = async (req, res) => {
    console.log('컨트롤러 type');
    try {
      const { type } = req.query; // 쿼리
      console.log('Controller restaurantByType');

      const restaurantsByT = await this.#service.restaurantByType(type);
      if (!restaurantsByT || restaurantsByT.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '선택한 타입의 매장 정보가 존재하지 않습니다' });
      }

      return res.status(HTTP_STATUS.OK).json(restaurantsByT);
    } catch (error) {
      console.error('Error in restaurantByType:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };

  // 지역
  // restaurantByAddress = async (localKeyword) => {console.log("Controller
  restaurantByAddress = async (req, res) => {
    try {
      const { address } = req.query; // 쿼리
      console.log('Controller restaurantByAddress');

      const restaurantsByA = await this.#service.restaurantByAddress(address);
      if (!restaurantsByA || restaurantsByA.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '선택한 지역의 매장 정보가 존재하지 않습니다' });
      }

      return res.status(HTTP_STATUS.OK).json(restaurantsByA);
    } catch (error) {
      console.error('Error in restaurantByType:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };

  ///////////////////////////////////////////

  // 매장 전체 조회
  //allRestaurant = async () => {console.log("Controller
  allRestaurant = async (req, res) => {
    try {
      console.log('Controller allRestaurant');

      const restaurants = await this.#service.allRestaurant();
      if (!restaurants || restaurants.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '매장 정보가 존재하지 않습니다.' });
      }

      return res.status(HTTP_STATUS.OK).json(restaurants);
    } catch (error) {
      console.error('Error in allRestaurant:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };

  ////////////////////////

  // 매장검색
  searchRestaurants = async (req, res) => {
    console.log('Controller searchRestaurants');
    try {
      const { search, type } = req.query; // 쿼리 파라미터로 전달된 search, type 값

      if (!search) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '검색어를 입력해 주세요.' });
      }

      // 검색 타입에 따른 분기 처리
      let restaurants;
      if (type === 'name') {
        restaurants = await this.#service.searchRestaurantsByName(search);
      } else if (type === 'menu') {
        restaurants = await this.#service.searchRestaurantsByMenu(search);
      } else {
        restaurants = await this.#service.searchRestaurantsByNameMenu(search);
      }

      if (!restaurants || restaurants.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '일치하는 매장 정보가 존재하지 않습니다.' });
      }

      return res.status(HTTP_STATUS.OK).json(restaurants);
    } catch (error) {
      console.error('Error in searchRestaurants:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  // restaurantDetail = async (restaurantId) => {console.log("Controller
  restaurantDetail = async (req, res) => {
    try {
      console.log('Controller restaurantDetail');
      const { restaurantId } = req.params; // URL 경로에서 id 추출

      const restaurant = await this.#service.restaurantDetail(+restaurantId);
      if (!restaurant || restaurant.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: '매장 정보가 존재하지 않습니다.' });
      }

      return res.status(HTTP_STATUS.OK).json(restaurant);
    } catch (error) {
      console.error('Error in restaurantDetail:', error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: '서버 내부 오류가 발생했습니다.' });
    }
  };
}

export default new GetRestaurantsController(GetRestaurantsService);
