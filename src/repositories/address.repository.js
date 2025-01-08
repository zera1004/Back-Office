import { prisma } from './../utils/prisma/index.js';

class AddressRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createAddress = async ({ address, addressName }) => {
    return await this.#orm.address.create({
      data: {
        address,
        addressName,
        // // user: {
        // //   connect: { userId },
        // },
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
      where: { addressId: +addressId },
    });
  };
}

export default new AddressRepository(prisma);
