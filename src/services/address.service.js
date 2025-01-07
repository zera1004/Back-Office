import addressRepository from '../repositories/address.repository.js';

class AddressService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createAddress = async (addressData) => {
    return await this.#repository.createAddress(addressData);
  };

  getAddress = async () => {
    return await this.#repository.getAllAddress();
  };

  updateAddress = async (addressId, addressData) => {
    const existAddress = await this.#repository.findUnique({
      where: { addressId: +addressId },
    });
    if (!existAddress) throw new Error('존재하지 않는 주소입니다.');

    return await this.#repository.updateAddress({
      where: { addressId: +addressId },
      data: addressData,
    });
  };

  deleteAddress = async (addressId) => {
    const existAddress = await this.#repository.findUnique({
      where: { addressId: +addressId },
    });
    if (!existAddress) throw new Error('존재하지 않는 주소입니다.');

    return await this.#repository.deleteAddress({
      where: { addressId: +addressId },
    });
  };
}

export default new AddressService(addressRepository);
