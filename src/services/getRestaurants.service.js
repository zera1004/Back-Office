// getRestaurants.service.js
// 서비스가 가장 무거움. 데이터 가공, 유효성 검증
import { MESSAGES } from '../constants/message.constant.js';
import GetRestaurantsRepository from '../repositories/getRestaurants.repository.js';

class GetRestaurantsService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  // 랭킹조회 : 매출별
  ranking = async () => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.RANK.CONSOLE);
    return await this.#repository.sortTotalPoint();
  };
  ////////////////

  // 매장 조회(영역별) <- 별점순 정렬하고 필요하면 거리순 추가

  // 지역
  restaurantByAddress = async (localKeyword) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.BYADDRESS.CONSOLE);
    return await this.#repository.restaurantByAddress(localKeyword);
  };

  // 식당 타입별
  restaurantByType = async (type) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.BYTYPE.TYPE);
    console.log(MESSAGES.GETRESTAURANT.SERVICE.BYTYPE.CONSOLE);
    return await this.#repository.restaurantByType(type);
  };
  // 매장 전체 조회
  allRestaurant = async () => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.ALL.CONSOLE);
    const restaurants = await this.#repository.allRestaurant();

    // 결과 데이터 검증
    if (!Array.isArray(restaurants)) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.ALL.ERROR_DATA);
    }

    if (restaurants.length === 0) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.ALL.ERROR_LENGTH);
    }

    return restaurants;
  };
  ////////////////////////

  // 매장검색
  // 매장 이름
  searchRestaurantsByName = async (nameKeyword) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.BYNAME.CONSOLE);
    //return await this.#repository.searchRestaurantsByName(nameKeyword);
    // 매개변수 검증
    if (
      !nameKeyword ||
      typeof nameKeyword !== 'string' ||
      nameKeyword.trim().length === 0
    ) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.BYNAME.ERROR_NAME);
    }

    const resultsName =
      await this.#repository.searchRestaurantsByName(nameKeyword);

    // 결과 데이터 검증
    if (!Array.isArray(resultsName) || resultsName.length === 0) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.BYNAME.ERROR_DATA);
    }

    return resultsName;
  };

  // 메뉴검색 : 메뉴이름, 메뉴 소개
  searchRestaurantsByMenu = async (menuKeyword) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.MENU.CONSOLE);
    if (
      !menuKeyword ||
      typeof menuKeyword !== 'string' ||
      menuKeyword.trim().length === 0
    ) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.MENU.ERROR_MENU);
    }

    const resultsMenu =
      await this.#repository.searchRestaurantsByMenu(menuKeyword);
    // 결과 데이터 검증
    if (!Array.isArray(resultsMenu) || resultsMenu.length === 0) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.MENU.ERROR_DATA);
    }

    console.log(6666);
    return resultsMenu;
  };

  // 종합 검색 : 가게 이름, 메뉴이름, 메뉴 소개
  searchRestaurantsByNameMenu = async (Keyword) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.NAMEMENU.CONSOLE);
    if (
      !Keyword ||
      typeof Keyword !== 'string' ||
      Keyword.trim().length === 0
    ) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.NAMEMENU.ERROR_KEY);
    }

    const resultsNM =
      await this.#repository.searchRestaurantsByNameMenu(Keyword);

    // 결과 데이터 검증
    if (!Array.isArray(resultsNM) || resultsNM.length === 0) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.NAMEMENU.ERROR_DATA);
    }

    return resultsNM;
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  restaurantDetail = async (restaurantId) => {
    console.log(MESSAGES.GETRESTAURANT.SERVICE.DETAIL.CONSOLE);
    console.log(
      MESSAGES.GETRESTAURANT.SERVICE.DETAIL.TYPE,
      typeof restaurantId,
    );

    // 매개변수 유효성 검증
    if (!restaurantId || typeof restaurantId !== 'number') {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.DETAIL.ERROR_ID);
    }
    const info = await this.#repository.restaurantDetail(restaurantId);
    // 결과 데이터 검증
    if (!info) {
      throw new Error(MESSAGES.GETRESTAURANT.SERVICE.DETAIL.ERROR_DATA);
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
