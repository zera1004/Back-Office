import addressService from '../services/address.service.js';

class AddressController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  createAddress = async (req, res, next) => {
    try {
      const { address, addressName } = req.body;
      const addres = await this.#service.createAddress({
        address,
        addressName,
      });
      return res.status(201).json({ data: addres });
    } catch (err) {
      next(err);
    }
  };

  getAddress = async (res, next) => {
    try {
      const addres = await this.#service.getAddress();
      return res.status(200).json({ data: addres });
    } catch (err) {
      next(err);
    }
  };

  updateAddress = async (req, res) => {
    try {
      const { postId } = req.params;
      const { address, addressName } = req.body;

      const addres = await this.#service.updateAddress({
        postId: +postId,
        address: address,
        addressName: addressName,
      });
      return res.status(200).json({ data: addres });
    } catch (err) {
      next(err);
    }
  };

  deleteAddress = async (req, res) => {
    try {
      const { postId } = req.params;

      const addres = await this.#service.deleteAddress(+postId);

      return res.status(200).json({ data: addres });
    } catch (err) {
      next(err);
    }
  };
}
