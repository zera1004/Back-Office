// getRestaurants.controller.js
// 간단하게 서비스 호출만
import { MESSAGES } from '../constants/message.constant.js';
import GetRestaurantsService from '../services/getRestaurants.service.js';

class GetRestaurantsController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  // 랭킹조회 : 매출순
  ranking = async (req, res) => {
    console.log(MESSAGES.GETRESTAURANT.RANK.CONTROLLER);
    try {
      const ranking = await this.#service.ranking();
      if (!ranking || ranking.length === 0) {
        return res
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.RANK.NOT_FOUND });
      }

      return res.status(200).json({
        message: MESSAGES.GETRESTAURANT.RANK.SUCCEED,
        data: ranking,
      });
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.RANK.ERROR_RANK, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.RANK.NOT_ERROR });
    }
  };

  // 식당 타입별
  // restaurantByType = async (type) => {console.log("Controller
  restaurantByType = async (req, res) => {
    console.log(MESSAGES.GETRESTAURANT.BYTYPE.TYPE);
    try {
      const { type } = req.query; // 쿼리
      console.log(MESSAGES.GETRESTAURANT.BYTYPE.CONSOLE);

      const restaurantsByT = await this.#service.restaurantByType(type);
      if (!restaurantsByT || restaurantsByT.length === 0) {
        return res
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.BYTYPE.NOT_FOUND });
      }

      return res.status(200).json(restaurantsByT);
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.BYTYPE.ERROR_TYPE, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.BYTYPE.NOT_ERROR });
    }
  };

  // 지역
  // restaurantByAddress = async (localKeyword) => {console.log("Controller
  restaurantByAddress = async (req, res) => {
    try {
      const { address } = req.query; // 쿼리
      console.log(MESSAGES.GETRESTAURANT.BYADDRESS.CONSOLE);

      const restaurantsByA = await this.#service.restaurantByAddress(address);
      if (!restaurantsByA || restaurantsByA.length === 0) {
        return res
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.BYADDRESS.NOT_FOUND });
      }

      return res.status(200).json(restaurantsByA);
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.BYADDRESS.ERROR_TYPE, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.BYADDRESS.NOT_ERROR });
    }
  };

  ///////////////////////////////////////////

  // 매장 전체 조회
  //allRestaurant = async () => {console.log("Controller
  allRestaurant = async (req, res) => {
    try {
      console.log(MESSAGES.GETRESTAURANT.ALL.CONSOLE);

      const restaurants = await this.#service.allRestaurant();
      if (!restaurants || restaurants.length === 0) {
        return res
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.ALL.NOT_FOUND });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.ALL.ERROR_TYPE, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.ALL.NOT_ERROR });
    }
  };

  ////////////////////////

  // 매장검색
  searchRestaurants = async (req, res) => {
    console.log(MESSAGES.GETRESTAURANT.SEARCH.CONSOLE);
    try {
      const { search, type } = req.query; // 쿼리 파라미터로 전달된 search, type 값

      if (!search) {
        return res
          .status(400)
          .json({ message: MESSAGES.GETRESTAURANT.SEARCH.SEARCH_RESTAURANT });
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
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.SEARCH.NOT_FOUND });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.SEARCH.ERROR_TYPE, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.SEARCH.NOT_ERROR });
    }
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  // restaurantDetail = async (restaurantId) => {console.log("Controller
  restaurantDetail = async (req, res) => {
    try {
      console.log(MESSAGES.GETRESTAURANT.DETAIL.CONSOLE);
      const { restaurantId } = req.params; // URL 경로에서 id 추출

      const restaurant = await this.#service.restaurantDetail(+restaurantId);
      if (!restaurant || restaurant.length === 0) {
        return res
          .status(404)
          .json({ message: MESSAGES.GETRESTAURANT.DETAIL.NOT_FOUND });
      }

      return res.status(200).json(restaurant);
    } catch (error) {
      console.error(MESSAGES.GETRESTAURANT.DETAIL.ERROR_TYPE, error);
      return res
        .status(500)
        .json({ message: MESSAGES.GETRESTAURANT.DETAIL.NOT_ERROR });
    }
  };
}

export default new GetRestaurantsController(GetRestaurantsService);
