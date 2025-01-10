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
}

export default new AddressRepository(prisma);
