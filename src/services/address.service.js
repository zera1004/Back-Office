import addressRepository from '../repositories/address.repository.js';

class AddressService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createAddress = async ({ userId, address, addressName }) => {
    return await this.#repository.createAddress({
      userId,
      address,
      addressName,
    });
  };

  getAddress = async () => {
    return await this.#repository.getAllAddress();
  };

  updateAddress = async ({ addressId, address, addressName }) => {
    const existAddress = await this.#repository.findUnique(addressId);
    if (!existAddress) throw new Error('존재하지 않는 주소입니다.');

    return await this.#repository.updateAddress({
      addressId,
      address,
      addressName,
    });
  };

  deleteAddress = async (addressId) => {
    const existAddress = await this.#repository.findUnique(addressId);
    if (!existAddress) throw new Error('존재하지 않는 주소입니다.');

    return await this.#repository.deleteAddress({
      addressId,
    });
  };
}

export default new AddressService(addressRepository);
