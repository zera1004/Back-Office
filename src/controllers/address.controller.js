import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import addressService from '../services/address.service.js';

class AddressController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // 주소 생성
  createAddress = async (req, res, next) => {
    try {
      const { address, addressName } = req.body;
      // const userId = 1;
      const { userId } = req.user;
      const _address = await this.#service.createAddress({
        userId: +userId,
        address,
        addressName,
      });
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.ADDRESS.CREATE.SUCCEED,
        data: _address,
      });
    } catch (error) {
      console.error('주소 생성 중 오류 발생:', error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  // 주소 조회
  getAddress = async (req, res, next) => {
    try {
      const _address = await this.#service.getAddress();
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS.READ_LIST.SUCCEED,
        data: _address,
      });
    } catch (error) {
      console.error('주소 조회 중 오류 발생:', error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  // 주소 수정
  updateAddress = async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const { address, addressName } = req.body;

      const _address = await this.#service.updateAddress({
        addressId: +addressId,
        address: address,
        addressName: addressName,
      });
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS.UPDATE.SUCCEED,
        data: _address,
      });
    } catch (error) {
      console.error('주소 수정 중 오류 발생:', error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  // 주소 삭제
  deleteAddress = async (req, res, next) => {
    try {
      const { addressId } = req.params;

      const _address = await this.#service.deleteAddress(+addressId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS.DELETE.SUCCEED,
        data: _address,
      });
    } catch (error) {
      console.error('주소 삭제 중 오류 발생:', error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  // 주소 상세 조회
  findAddressById = async (req, res, next) => {
    try {
      const { addressId } = req.params;

      const _address = await this.#service.findAddressById(+addressId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.ADDRESS.READ_LIST.SUCCEED,
        data: _address,
      });
    } catch (error) {
      console.error('주소 조회 중 오류 발생:', error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };
}

export default new AddressController(addressService);
