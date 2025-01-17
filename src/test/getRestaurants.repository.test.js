import { jest } from '@jest/globals';
import GetRestaurantsRepository from '../repositories/getRestaurants.repository';
import { prisma } from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  prisma: {
    Restaurant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('GetRestaurantsRepository', () => {
  it('should fetch ranking data successfully', async () => {
    prisma.Restaurant.findMany.mockResolvedValue([
      { restaurantName: 'MockRestaurant', totalPoint: 200 },
    ]);

    const result = await GetRestaurantsRepository.sortTotalPoint();

    expect(prisma.Restaurant.findMany).toHaveBeenCalledWith({
      orderBy: { totalPoint: 'desc' },
      take: 20,
      select: expect.any(Object),
    });
    expect(result).toEqual([
      { restaurantName: 'MockRestaurant', totalPoint: 200 },
    ]);
  });

  it('should throw error if database call fails', async () => {
    prisma.Restaurant.findMany.mockRejectedValue(new Error('Database Error'));

    await expect(GetRestaurantsRepository.sortTotalPoint()).rejects.toThrow(
      'Database Error',
    );
  });
});
