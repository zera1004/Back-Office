import paymentRepository from '../repositories/payment.repository.js';

class paymentService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async getPayment(userId) {
    const payment = await this.#repository.findPayment(userId);
    return payment;
  }

  async getRestaurantPoint(ownerId) {
    const restaurant = await this.#repository.findRestaurant(ownerId);
    if (!restaurant) return null;

    return {
      restaurantName: restaurant.restaurantName,
      totalPoint: restaurant.totalPoint,
    };
  }
}

export default new paymentService(paymentRepository);
