import { prisma } from '../utils/prisma/index.js';

class RestaurantRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }
  // 사장님 정보 찾기
  findOwner = async (data) => {
    return await this.#orm.owner.findUnique({
      where: { ownerId: parseInt(data.ownerId) },
    });
  };

  // 레스토랑 찾기!
  findRestaurant = async (data) => {
    return await this.#orm.restaurant.findUnique({
      where: { restaurantId: parseInt(data.restaurantId) },
    });
  };

  // 사장님 업장 찾기
  findOwnerRestaurant = async (data) => {
    return await this.#orm.restaurant.findFirst({
      where: { ownerId: parseInt(data.ownerId) },
    });
  };

  // 업장 등록하기
  postRestaurant = async (data) => {
    return await this.#orm.restaurant.create({
      data: {
        ownerId: data.ownerId,
        address: data.address,
        phoneNumber: data.phoneNumber,
        restaurantName: data.restaurantName,
        restaurantType: data.restaurantType,
      },
    });
  };

  // 레스토랑 수정(업데이트)
  updateRestaurant = async (data) => {
    return await this.#orm.restaurant.update({
      where: { restaurantId: parseInt(data.restaurantId) },
      data: {
        address: data.address,
        phoneNumber: data.phoneNumber,
        restaurantName: data.restaurantName,
        restaurantType: data.restaurantType,
      },
    });
  };

  // 레스토랑 삭제
  deleteRestaurant = async (data) => {
    return await this.#orm.restaurant.delete({
      where: { restaurantId: parseInt(data.restaurantId) },
    });
  };
}
export default new RestaurantRepository(prisma);
