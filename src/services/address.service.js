import { MESSAGES } from '../constants/message.constant.js';
import addressRepository from '../repositories/address.repository.js';

class AddressService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  // 주소 생성
  createAddress = async ({ userId, address, addressName }) => {
    if (!userId) {
      throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND_USER);
    }
    if (!address) {
      throw new Error(MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED);
    }
    if (!addressName) {
      throw new Error(MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED);
    }

    const user = await this.#repository.findUser(userId);
    if (!user) {
      throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND_USER);
    }

    return await this.#repository.createAddress({
      userId,
      address,
      addressName,
    });
  };

  // 주소 찾기
  getAddress = async () => {
    return await this.#repository.getAllAddress();
  };

  // 주소 수정
  updateAddress = async ({ addressId, address, addressName }) => {
    if (!addressId) {
      throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND);
    }
    if (!address) {
      throw new Error(MESSAGES.ADDRESS.COMMON.ADDRESS.REQUIRED);
    }
    if (!addressName) {
      throw new Error(MESSAGES.ADDRESS.COMMON.ADDRESSNAME.REQUIRED);
    }

    const existAddress = await this.#repository.findUnique(addressId);
    if (!existAddress) throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND);

    return await this.#repository.updateAddress({
      addressId,
      address,
      addressName,
    });
  };

  // 주소 삭제
  deleteAddress = async (addressId) => {
    const existAddress = await this.#repository.findUnique(addressId);
    if (!existAddress) throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND);

    return await this.#repository.deleteAddress({
      addressId,
    });
  };

  // 주소 상세 조회
  findAddressById = async (addressId) => {
    const existAddress = await this.#repository.findUnique(addressId);
    if (!existAddress) throw new Error(MESSAGES.ADDRESS.COMMON.NOT_FOUND);

    return await this.#repository.findUnique(addressId);
  };

  // 메인 주소 설정
  setMainAddress = async ({ addressId, userId }) => {
    const existingMainAddresses =
      await this.#repository.getMainAddresses(userId);

    // 데이터 무결성 검증: 중복된 mainAddress가 있을 경우 정리
    if (existingMainAddresses.length > 1) {
      throw new Error(MESSAGES.ADDRESS.MAINADDRESS.SAME_ADDRESS);
    }

    return await this.#repository.setMainAddress({ addressId, userId });
  };
}

export default new AddressService(addressRepository);
