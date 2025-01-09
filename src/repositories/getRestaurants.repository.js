//getRestaurants.repository.js
import prisma from '../utils/prisma/index.js';

class GetRestaurantsRepository {
  #orn;
  constructor(orn) {
    this.#orn = orn;
  }

  ///////////////
  // 랭킹조회 : 매출별 <-
  /**
   * 결제테이블에서 해당 식당의 결제액 총합 구하고 임시컬럼 만들기
   * 매출액 순으로 정렬
   * 상위 20개만 가져오기
   */
  sortTotalPoint = async () => {
    console.log('Repository sortTotalPoint');
    return await this.#orn.Restaurant.findMany({
      orderBy: {
        totalPoint: 'desc',
      },
      take: 20,
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };
  ////////////////

  // 매장 조회(영역별) <- 별점순 정렬하고 필요하면 거리순 추가

  // 지역
  restaurantByAddress = async (localKeyword) => {
    console.log('Repository restaurantByAddress');

    const restaurantsA = await this.#orn.restaurant.findMany({
      // Where: { address: `%${localKeyword}%` },
      where: {
        address: {
          contains: localKeyword, // 검색어
          // mode: 'insensitive', // 대소문자 구분하지 않음,// 최신버전이지만 안됨
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });

    console.log('주소 : ', restaurantsA);
    return restaurantsA;
  };

  // 식당 타입별
  restaurantByType = async (type) => {
    console.log('repository type');
    const data = await this.#orn.Restaurant.findMany({
      where: { restaurantType: type },
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });

    console.log('repository type : ', data.length);
    return data;
  };

  // 매장 전체 조회
  allRestaurant = async () => {
    console.log('Repository RestaurantByType');
    return await this.#orn.Restaurant.findMany({
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  ////////////////////////

  // 매장검색
  // 매장 이름
  searchRestaurantsByName = async (nameKeyword) => {
    console.log('Repository searchRestaurantsByName');
    return await this.#orn.Restaurant.findMany({
      // Where: { restaurantName: `%${nameKeyword}%` },
      where: {
        restaurantName: {
          contains: nameKeyword, // 검색어
          //  mode: 'insensitive', // 대소문자 구분하지 않음
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  // 메뉴검색 : 메뉴이름, 메뉴 소개
  searchRestaurantsByMenu = async (menuKeyword) => {
    console.log('Repository searchRestaurantsByMenu');
    const restaurantsM = await this.#orn.Restaurant.findMany({
      // Restaurant와 연결된 Menu테이블의 menuName, content컬럼의 값이 하나라도 `%${menuKeyword}%`인 데이터를 가져오기
      //  Where: { menu: { Where: { menuName: `%${menuKeyword}%` } } },
      where: {
        menu: {
          some: {
            OR: [
              {
                menuName: {
                  contains: menuKeyword, // 메뉴 이름에 검색어 포함
                  //  mode: 'insensitive', // 대소문자 구분하지 않음
                },
              },
              {
                content: {
                  contains: menuKeyword, // 메뉴 소개에 검색어 포함
                  //  mode: 'insensitive', // 대소문자 구분하지 않음
                },
              },
            ],
          },
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
    console.log('메뉴 : ', restaurantsM);
    return restaurantsM;
  };

  // 종합 검색 : 가게 이름, 메뉴이름, 메뉴 소개
  searchRestaurantsByNameMenu = async (keyword) => {
    console.log('Repository searchRestaurantsByMenu');
    const restaurantsNM = await this.#orn.Restaurant.findMany({
      // Restaurant와 연결된 Menu테이블의 menuName, content컬럼의 값이 하나라도 `%${keyword}%`인 데이터를 가져오기
      //  Where: { menu: { Where: { menuName: `%${menuKeyword}%` } } },
      where: {
        OR: [
          {
            restaurantName: {
              contains: keyword, // 검색어
              //  mode: 'insensitive', // 대소문자 구분하지 않음
            },
          },
          {
            menu: {
              some: {
                OR: [
                  {
                    menuName: {
                      contains: keyword, // 메뉴 이름에 검색어 포함
                      //  mode: 'insensitive', // 대소문자 구분하지 않음
                    },
                  },
                  {
                    content: {
                      contains: keyword, // 메뉴 소개에 검색어 포함
                      //  mode: 'insensitive', // 대소문자 구분하지 않음
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      orderBy: {
        averageStar: 'desc',
      },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
    console.log('종합검색 : ', restaurantsNM);
    return restaurantsNM;
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  restaurantDetail = async (restaurantId) => {
    console.log('Repository restaurantDetails');
    const info = await this.#orn.Restaurant.findUnique({
      where: { restaurantId },
      select: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        totalPoint: true,
        createdAt: true,

        menu: {
          select: {
            menuName: true,
            price: true,
            content: true,
          },
        },

        review: {
          select: {
            content: true,
            star: true,
            createdAt: true,
            updatedAt: true,

            user: {
              select: { name: true },
            },
          },
        },

        owner: {
          select: { name: true },
        },
      },
    });

    console.log('상세 조회 : ', info);
    return info;
  };
}

export default new GetRestaurantsRepository(prisma);
