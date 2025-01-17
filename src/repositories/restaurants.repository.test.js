import { RestaurantRepository } from './restaurants.repository.js';
import { expect, jest } from '@jest/globals';

describe('restaurantsRepository', () => {
  let repository;
  let fakePrisma;

  const mockData = { id: 1, name: 'Item 1', ownerId: 1 };

  beforeEach(() => {
    fakePrisma = {
      restaurant: {
        findUnique: jest.fn(),
      },
    };

    repository = new RestaurantRepository(fakePrisma);
  });

  describe('오너찾기', () => {
    it('오너의 id 값으로 사장님 정보를 찾는다', () => {
      fakePrisma.restaurant.findUnique.mockResolvedValue(mockData);

      const result = repository.findUnique(1);

      expect(fakePrisma.restaurant.findUnique).toHaveBeenCalled({
        where: { ownerId: 1 },
      });

      expect(result).toEqual(mockData);
    });

    it('should return empty array when initialized without data', () => {
      const emptyRepository = new RestaurantRepository();
      const result = emptyRepository.findUnique();

      expect(result).toEqual([]);
    });
  });
});
