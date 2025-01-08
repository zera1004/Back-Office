// getRestaurants.controller.js

import GetRestaurantsService from '../services/getRestaurants.service.js';

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
          .status(404)
          .json({ message: '매장 매출 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json({
        message: '매출 상위 20위',
        data: ranking,
      });
    } catch (error) {
      console.error('Error in ranking:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };

  ////////////////

  // 타입별 조회
  /*
  restaurantBytype = async (req, res) => {
    const { type } = req.query; // 쿼리
    const typeR = [chinese, western, korean, japanese, franchise, snack, cafe];

    if (typeR.includes(type)) {
      // 식당 타입별
      // restaurantByType = async (type) => {console.log("Controller
    } else {
      // 지역
      // restaurantByAddress = async (localKeyword) => {console.log("Controller
    }
  };
*/

  // 식당 타입별
  // restaurantByType = async (type) => {console.log("Controller
  restaurantByType = async (req, res) => {
    try {
      const { type } = req.query; // 쿼리
      console.log('Controller restaurantByType');

      const restaurantsByT = await this.#service.restaurantByType(type);
      if (!restaurantsByT || restaurantsByT.length === 0) {
        return res
          .status(404)
          .json({ message: '선택한 타입의 매장 정보가 존재하지 않습니다' });
      }

      return res.status(200).json(restaurantsByT);
    } catch (error) {
      console.error('Error in restaurantByType:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
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
          .status(404)
          .json({ message: '선택한 지역의 매장 정보가 존재하지 않습니다' });
      }

      return res.status(200).json(restaurantsByA);
    } catch (error) {
      console.error('Error in restaurantByType:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };

  // 매장 전체 조회
  //allRestaurant = async () => {console.log("Controller
  allRestaurant = async (req, res) => {
    try {
      console.log('Controller allRestaurant');

      const restaurants = await this.#service.allRestaurant();
      if (!restaurants || restaurants.length === 0) {
        return res
          .status(404)
          .json({ message: '매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      console.error('Error in allRestaurant:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };
  ////////////////////////

  // 매장검색
  searchRestaurants = async (req, res) => {
    console.log('Controller searchRestaurants');
    try {
      const { search, type } = req.query; // 쿼리 파라미터로 전달된 search, type 값

      if (!search) {
        return res.status(400).json({ message: '검색어를 입력해 주세요.' });
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
          .json({ message: '일치하는 매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      console.error('Error in searchRestaurants:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };

  /*
  // 매장 이름
  // searchRestaurantsByName = async (nameKeyword) => {console.log("Controller
  searchRestaurantsByName = async (req, res) => {
    console.log('Controller RestaurantsByName');
    try {
      const { nameKeyword } = req.body;

      const restaurantsByName =
        await this.#service.searchRestaurantsByName(nameKeyword);
      if (!restaurantsByName || restaurantsByName.length === 0) {
        return res
          .status(404)
          .json({ message: '일치하는 매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurantsByName);
    } catch (error) {
      console.error('Error in restaurantsByName:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };
  // 메뉴검색 : 메뉴이름, 메뉴 소개
  // searchRestaurantsByMenu = async (menuKeyword) => {console.log("Controller
  searchRestaurantsByMenu = async (req, res) => {
    console.log('Controller RestaurantsByName');
    try {
      const { menuKeyword } = req.body;

      const restaurantsByMenu =
        await this.#service.searchRestaurantsByMenu(menuKeyword);
      if (!restaurantsByMenu || restaurantsByMenu.length === 0) {
        return res
          .status(404)
          .json({ message: '일치하는 매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurantsByMenu);
    } catch (error) {
      console.error('Error in restaurantsByMenu:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };

  // 추가하기 - 메뉴검색 : 가게 이름, 메뉴이름, 메뉴 소개
  // searchRestaurantsByNameMenu = async (keyword) => {
  searchRestaurantsByNameMenu = async (req, res) => {
    console.log('Controller searchRestaurantsByNameMenu');
    try {
      const { keyword } = req.body;

      const restaurantsByNameMenu =
        await this.#service.searchRestaurantsByNameMenu(keyword);
      if (!restaurantsByNameMenu || restaurantsByNameMenu.length === 0) {
        return res
          .status(404)
          .json({ message: '일치하는 매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurantsByNameMenu);
    } catch (error) {
      console.error('Error in restaurantsByNameMenu:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };
*/

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  // restaurantDetail = async (restaurantId) => {console.log("Controller
  restaurantDetail = async (req, res) => {
    try {
      console.log('Controller restaurantDetail');
      const { restaurantId } = req.params; // URL 경로에서 id 추출

      const restaurant = await this.#service.restaurantDetail(restaurantId);
      if (!restaurant || restaurant.length === 0) {
        return res
          .status(404)
          .json({ message: '매장 정보가 존재하지 않습니다.' });
      }

      return res.status(200).json(restaurant);
    } catch (error) {
      console.error('Error in restaurantDetail:', error);
      return res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
    }
  };
}

export default GetRestaurantsController(GetRestaurantsService);
