import addressService from '../services/address.service.js';

class AddressController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  createAddress = async (req, res, next) => {
    try {
      const { address, addressName } = req.body;
      const userId = 1;
      // const {userId} = req.user
      const _address = await this.#service.createAddress({
        userId: +userId,
        address,
        addressName,
      });
      return res
        .status(201)
        .json({ message: '주소가 생성되었습니다.', data: _address });
    } catch (error) {
      console.error('주소 생성 중 오류 발생:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  getAddress = async (req, res, next) => {
    try {
      const _address = await this.#service.getAddress();
      return res
        .status(200)
        .json({ message: '주소가 조회되었습니다.', data: _address });
    } catch (error) {
      console.error('주소 조회 중 오류 발생:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  updateAddress = async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const { address, addressName } = req.body;

      const _address = await this.#service.updateAddress({
        addressId: +addressId,
        address: address,
        addressName: addressName,
      });
      return res
        .status(200)
        .json({ message: '주소가 수정되었습니다.', data: _address });
    } catch (error) {
      console.error('주소 수정 중 오류 발생:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  deleteAddress = async (req, res, next) => {
    try {
      const { addressId } = req.params;

      const _address = await this.#service.deleteAddress(+addressId);

      return res
        .status(200)
        .json({ message: '주소가 삭제되었습니다.', data: _address });
    } catch (error) {
      console.error('주소 삭제 중 오류 발생:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
}

export default new AddressController(addressService);
