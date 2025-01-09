import { prisma } from './../utils/prisma/index.js';

class AddressRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createAddress = async ({ address, addressName, userId }) => {
    return await this.#orm.address.create({
      data: {
        userId,
        address,
        addressName,
      },
    });
  };

  getAllAddress = async () => {
    return await this.#orm.address.findMany();
  };

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

  deleteAddress = async ({ addressId }) => {
    return await this.#orm.address.delete({
      where: { addressId },
    });
  };

  findUnique = async (addressId) => {
    return await this.#orm.address.findUnique({ where: { addressId } });
  };

  findUser = async (userId) => {
    return await this.#orm.user.findUnique({
      where: { userId },
    });
  };
}

export default new AddressRepository(prisma);
