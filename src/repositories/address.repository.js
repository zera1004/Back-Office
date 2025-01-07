import { prisma } from './../utils/prisma/index.js';

class AddressRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createAddress = async ({ address, addressName }) => {
    return await this.#orm.address.create({
      data: { address, addressName },
    });
  };

  getAllAddress = async () => {
    return await this.#orm.address.findMany();
  };

  updateAddress = async (addressId, address, addressName) => {
    return await this.#orm.address.findUnique({
      where: {
        addressId: +addressId,
      },
      data: {
        address,
        addressName,
      },
    });
  };

  deleteAddress = async (addressId) => {
    return await this.#orm.address.delete({
      where: { addressId: +addressId },
    });
  };
}

export default new AddressRepository(prisma);
