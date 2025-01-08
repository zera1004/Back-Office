//getRestaurants.repository.js
import prisma from '../utils/prisma/index.js';

class GetRestaurantsRepository {
  #orn;
  constructor(orn) {
    this.#orn = orn;
  }

  // Restaurant 테이블
  /**
   * model Restaurant {
  restaurantId Int @id @default(autoincrement())
  ownerId Int
  address String
  phoneNumber String
  restaurantName String
  restaurantType RestaurantType
  totalPoint Int
  createdAt DateTime @default(now()) @map("created_at")

  menu Menu[]
  review Review[]
  order Order[]  
  paynemt Payment[]

  owner Owner @relation(fields: [ownerId], references: [ownerId], onDelete: Cascade, onUpdate: Cascade)
}

enum RestaurantType {
  chinese 
  western 
  korean 
  japanese 
  franchise
  snack
  cafe
}*/

  // Payment 테이블
  /*
  model Payment {
  paymentId Int @id @default(autoincrement())
  orderId Int
  userId Int
  tatal_price Int
  order_time DateTime @default(now())
  createdAt DateTime @default(now()) @map("created_at")

  review Review[]
  order Order[]

  restaurant Restaurant @relation(fields: [restaurantId], references: [restaurantId], onDelete: Cascade, onUpdate: Cascade)
  user User @relation(fields: [userId], references: [userId], onDelete: Cascade, onUpdate: Cascade)
}
   */

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
      Selection: {
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
    return await this.#orn.Restaurant.findMany({
      // Where: { address: `%${localKeyword}%` },
      where: {
        menu: {
          some: {
            menuName: {
              contains: localKeyword, // 검색어
              mode: 'insensitive', // 대소문자 구분하지 않음
            },
          },
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      Selection: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  // 식당 타입별
  restaurantByType = async (type) => {
    console.log('repository ');
    return await this.#orn.Restaurant.findMany({
      Where: { RestaurantType: type },
      orderBy: {
        averageStar: 'desc',
      },
      Selection: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  // 매장 전체 조회
  allRestaurant = async () => {
    console.log('Repository RestaurantByType');
    return await this.#orn.Restaurant.findMany({
      orderBy: {
        averageStar: 'desc',
      },
      Selection: {
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
        menu: {
          some: {
            menuName: {
              contains: nameKeyword, // 검색어
              mode: 'insensitive', // 대소문자 구분하지 않음
            },
          },
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      Selection: {
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
    return await this.#orn.Restaurant.findMany({
      // Restaurant와 연결된 Menu테이블의 menuName, content컬럼의 값이 하나라도 `%${menuKeyword}%`인 데이터를 가져오기
      //  Where: { menu: { Where: { menuName: `%${menuKeyword}%` } } },
      where: {
        menu: {
          some: {
            OR: [
              {
                menuName: {
                  contains: menuKeyword, // 메뉴 이름에 검색어 포함
                  mode: 'insensitive', // 대소문자 구분하지 않음
                },
              },
              {
                content: {
                  contains: menuKeyword, // 메뉴 소개에 검색어 포함
                  mode: 'insensitive', // 대소문자 구분하지 않음
                },
              },
            ],
          },
        },
      },
      orderBy: {
        averageStar: 'desc',
      },
      Selection: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  // 추가하기 - 메뉴검색 : 가게 이름, 메뉴이름, 메뉴 소개
  searchRestaurantsByNameMenu = async (keyword) => {
    console.log('Repository searchRestaurantsByMenu');
    return await this.#orn.Restaurant.findMany({
      // Restaurant와 연결된 Menu테이블의 menuName, content컬럼의 값이 하나라도 `%${keyword}%`인 데이터를 가져오기
      //  Where: { menu: { Where: { menuName: `%${menuKeyword}%` } } },
      where: {
        OR: [
          {
            name: {
              contains: Keyword, // 식당 이름에 검색어 포함
              mode: 'insensitive', // 대소문자 구분하지 않음
            },
          },
          {
            menu: {
              some: {
                OR: [
                  {
                    menuName: {
                      contains: keyword, // 메뉴 이름에 검색어 포함
                      mode: 'insensitive', // 대소문자 구분하지 않음
                    },
                  },
                  {
                    content: {
                      contains: keyword, // 메뉴 소개에 검색어 포함
                      mode: 'insensitive', // 대소문자 구분하지 않음
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
      Selection: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        restaurantType: true,
        averageStar: true,
      },
    });
  };

  // 매장 상세조회 : 가게 정보, 메뉴, 후기
  restaurantDetail = async (restaurantId) => {
    console.log('Repository restaurantDetails');
    const info = await this.#orn.Restaurant.findUnique({
      Where: { restaurantId },
      Selection: {
        address: true,
        phoneNumber: true,
        restaurantName: true,
        totalPoint: true,
        createdAt: true,

        menu: {
          some: {
            menuName: true,
            price: true,
            content: true,
          },
        },

        review: {
          some: {
            content: true,
            star: true,
            createdAt: true,
            updatedAt: true,

            user: {
              some: { name: true },
            },
          },
        },

        owner: {
          some: { name: true },
        },
      },
    });
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

export default new GetRestaurantsRepository(prisma);
