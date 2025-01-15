import { prisma } from './../utils/prisma/index.js';

class AddressRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  // 주소 생성
  createAddress = async ({ address, addressName, userId }) => {
    return await this.#orm.address.create({
      data: {
        userId,
        address,
        addressName,
      },
    });
  };

  // 주소 조회
  getAllAddress = async () => {
    return await this.#orm.address.findMany();
  };

  // 주소 수정
  updateAddress = async ({ addressId, address, addressName }) => {
    console.log(addressId);
    return await this.#orm.address.update({
      where: {
        addressId,
      },
      data: {
        address: address,
        addressName: addressName,
      },
    });
  };

  // 주소 삭제
  deleteAddress = async ({ addressId }) => {
    return await this.#orm.address.delete({
      where: { addressId },
    });
  };

  // 주소 찾기
  findUnique = async (addressId) => {
    return await this.#orm.address.findUnique({ where: { addressId } });
  };

  // 유저 찾기
  findUser = async (userId) => {
    return await this.#orm.user.findUnique({
      where: { userId },
    });
  };

  // 메인 주소 설정
  setMainAddress = async ({ addressId, userId }) => {
    // 1. 기존 메인 주소 비활성화
    await this.#orm.address.updateMany({
      where: { userId, mainAddress: true },
      data: { mainAddress: false },
    });

    // 2. 지정된 주소를 메인 주소로 설정
    return await this.#orm.address.update({
      where: { addressId },
      data: { mainAddress: true },
    });
  };

  // Repository 메서드: 특정 사용자의 mainAddress가 true인 주소들을 조회
  getMainAddresses = async (userId) => {
    return await this.#orm.address.findMany({
      where: {
        userId, // 특정 사용자
        mainAddress: true, // mainAddress가 true인 항목만
      },
    });
  };

  // 특정 사용자의 모든 주소 조회
  getAllAddressesByUserId = async (userId) => {
    return await this.#orm.address.findMany({
      where: { userId },
    });
  };
}

export default new AddressRepository(prisma);
