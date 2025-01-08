import GetRestaurantsRepository from '../repositories/getRestaurants.repository.js';

class GetRestaurantsService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  // console.log('Service ');
  // 랭킹조회 : 매출별 <-
  ranking = async () => {
    console.log('Service ranking');
    return await this.#repository.sortTotalPoint();
  };
  ////////////////

  // 매장 조회(영역별) <- 별점순 정렬하고 필요하면 거리순 추가

  // 지역
  RestaurantByaddress = async (localKeyword) => {
    console.log('Service RestaurantByaddress');
    return await this.#repository.RestaurantByaddress(localKeyword);
  };
  // 식당 타입별
  RestaurantByType = async (type) => {
    console.log('Service RestaurantByType');
    return await this.#repository.RestaurantByType(type);
  };
  // 매장 전체 조회
  allRestaurant = async () => {
    console.log('Service allRestaurant');
    return await this.#repository.allRestaurant();
  };
  ////////////////////////

  // 매장검색
  // 매장 이름
  searchRestaurantsByName = async (nameKeyword) => {
    console.log('Service searchRestaurantsByName');
    return await this.#repository.searchRestaurantsByName(nameKeyword);
  };
  // 메뉴검색 : 메뉴이름, 메뉴 소개
  // searchRestaurantsByMenu = async (menuKeyword) =>
  searchRestaurantsByMenu = async (menuKeyword) => {
    console.log('Service searchRestaurantsByMenu');
    return await this.#repository.searchRestaurantsByMenu(menuKeyword);
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  restaurantDetails = async (restaurantId) => {
    console.log('Service restaurantDetails');
    return await this.#repository.restaurantDetails(restaurantId);
  };
}
