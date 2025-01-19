import { menuRepository } from './src/repositories/menu.repository.js';
import {jest} from '@jest/globals'

describe('menuRepository Test', () => {
  let fakePrisma;
  let repository;
  let mockData = {
    { res, menuId: 1, menuName: "",  },
    {},
    {}
  };

  beforeEach(() => {
    fakePrisma = {
      findMany: jest.fn(),
    };
    fakePrisma.findMany.meockReturnValue(mockData);

    menuRepository = new menuRepository(fakePrisma);
  });

  describe('findMany test', () => {
    it('특정데이터만 리턴해야함', () => {
    const data = menuRepository.findMany();
      expect(data).toEqual(mockData);
    });
  });
});


// import { RestaurantRepository } from './restaurants.repository.js';
// import { jest } from '@jest/globals';
// describe('RestaurantRepository - findOwner', () => {
//   let mockOrm;
//   let repository;
//   beforeEach(() => {
//     // Mock ORM 객체 생성
//     mockOrm = {
//       owner: {
//         findUnique: jest.fn(), // Mock 메서드
//       },
//     };
//     // Repository 인스턴스 생성
//     repository = new RestaurantRepository(mockOrm);
//   });
//   it('should call findUnique with correct ownerId and return the owner data', async () => {
//     // 테스트 입력값과 예상 결과값
//     const inputData = { ownerId: '123' }; // ownerId는 문자열로 들어오지만 내부에서 parseInt 처리
//     const expectedResult = { ownerId: 123, name: 'John Doe' };
//     // Mock 동작 정의
//     mockOrm.owner.findUnique.mockResolvedValue(expectedResult);
//     // 메서드 호출
//     const result = await repository.findOwner(inputData);
//     // 검증
//     expect(mockOrm.owner.findUnique).toHaveBeenCalledWith({
//       where: { ownerId: 123 }, // parseInt로 변환된 값
//     });
//     expect(result).toEqual(expectedResult);
//   });
//   it('should return null if no owner is found', async () => {
//     // Mock 동작 정의 (결과값이 없는 경우)
//     mockOrm.owner.findUnique.mockResolvedValue(null);
//     // 메서드 호출
//     const result = await repository.findOwner({ ownerId: '999' });
//     // 검증
//     expect(mockOrm.owner.findUnique).toHaveBeenCalledWith({
//       where: { ownerId: 999 },
//     });
//     expect(result).toBeNull();
//   });
//   it('should throw an error if findUnique fails', async () => {
//     // Mock 동작 정의 (에러 발생)
//     mockOrm.owner.findUnique.mockRejectedValue(new Error('Database error'));
//     // 메서드 호출 및 에러 검증
//     await expect(repository.findOwner({ ownerId: '123' })).rejects.toThrow(
//       'Database error',
//     );
//     // 호출 여부 검증
//     expect(mockOrm.owner.findUnique).toHaveBeenCalledWith({
//       where: { ownerId: 123 },
//     });
//   });
// });