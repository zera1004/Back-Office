// getRestaurants.service.js
// 서비스가 가장 무거움. 데이터 가공, 유효성 검증
import GetRestaurantsRepository from '../repositories/getRestaurants.repository.js';

class GetRestaurantsService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  // 랭킹조회 : 매출별
  ranking = async () => {
    console.log('Service ranking');
    return await this.#repository.sortTotalPoint();
  };
  ////////////////

  // 매장 조회(영역별) <- 별점순 정렬하고 필요하면 거리순 추가

  // 지역
  restaurantByAddress = async (localKeyword) => {
    console.log('Service restaurantByAddress');
    return await this.#repository.restaurantByAddress(localKeyword);
  };

  // 식당 타입별
  restaurantByType = async (type) => {
    console.log('서비스 type');
    console.log('Service restaurantByType');
    return await this.#repository.restaurantByType(type);
  };
  // 매장 전체 조회
  allRestaurant = async () => {
    console.log('Service allRestaurant');
    const restaurants = await this.#repository.allRestaurant();

    // 결과 데이터 검증
    if (!Array.isArray(restaurants)) {
      throw new Error('Invalid data format: expected an array of restaurants');
    }

    if (restaurants.length === 0) {
      throw new Error('No restaurants available');
    }

    return restaurants;
  };
  ////////////////////////

  // 매장검색
  // 매장 이름
  searchRestaurantsByName = async (nameKeyword) => {
    console.log('Service searchRestaurantsByName');
    //return await this.#repository.searchRestaurantsByName(nameKeyword);
    // 매개변수 검증
    if (
      !nameKeyword ||
      typeof nameKeyword !== 'string' ||
      nameKeyword.trim().length === 0
    ) {
      throw new Error('Invalid name keyword');
    }

    const resultsName =
      await this.#repository.searchRestaurantsByName(nameKeyword);

    // 결과 데이터 검증
    if (!Array.isArray(resultsName) || resultsName.length === 0) {
      throw new Error('No restaurants found with the given name');
    }

    return resultsName;
  };

  // 메뉴검색 : 메뉴이름, 메뉴 소개
  searchRestaurantsByMenu = async (menuKeyword) => {
    console.log('Service searchRestaurantsByMenu');
    if (
      !menuKeyword ||
      typeof menuKeyword !== 'string' ||
      menuKeyword.trim().length === 0
    ) {
      throw new Error('Invalid menu keyword');
    }

    const resultsMenu =
      await this.#repository.searchRestaurantsByMenu(menuKeyword);
    // 결과 데이터 검증
    if (!Array.isArray(resultsMenu) || resultsMenu.length === 0) {
      throw new Error('No restaurants found with the given menu');
    }

    console.log(6666);
    return resultsMenu;
  };

  // 종합 검색 : 가게 이름, 메뉴이름, 메뉴 소개
  searchRestaurantsByNameMenu = async (Keyword) => {
    console.log('Service searchRestaurantsByMenu');
    if (
      !Keyword ||
      typeof Keyword !== 'string' ||
      Keyword.trim().length === 0
    ) {
      throw new Error('Invalid keyword');
    }

    const resultsNM =
      await this.#repository.searchRestaurantsByNameMenu(Keyword);

    // 결과 데이터 검증
    if (!Array.isArray(resultsNM) || resultsNM.length === 0) {
      throw new Error('No restaurants found with the given name, menu');
    }

    return resultsNM;
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  restaurantDetail = async (restaurantId) => {
    console.log('Service restaurantDetails');
    console.log('타입 : ', typeof restaurantId);

    // 매개변수 유효성 검증
    if (!restaurantId || typeof restaurantId !== 'number') {
      throw new Error('Invalid restaurant ID');
    }
    const info = await this.#repository.restaurantDetail(restaurantId);
    // 결과 데이터 검증
    if (!info) {
      throw new Error('Restaurant not found');
    }

    // 데이터 구조화
    const returnInfo = {
      data: {
        restaurantInfo: {
          address: info.address,
          phoneNumber: info.phoneNumber,
          restaurantName: info.restaurantName,
          totalPoint: info.totalPoint,
          createdAt: info.createdAt,
          ownerName: info.owner?.name,
        },
        menu: info.menu,
        reviews: info.review.map((review) => ({
          content: review.content,
          star: review.star,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          userName: review.user?.name,
        })),
      },
    };
    return returnInfo;
  };
}

export default new GetRestaurantsService(GetRestaurantsRepository);
