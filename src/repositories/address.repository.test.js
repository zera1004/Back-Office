import { AddressRepository } from './address.repository.js';
import { jest } from '@jest/globals';

// AddressRepository 테스트
// AddressRepository 클래스의 메서드들을 테스트하기 위해 작성된 코드입니다.
describe('AddressRepository', () => {
  let mockOrm;
  let repository;

  beforeEach(() => {
    // Mock ORM 객체 생성
    // Prisma Client와 유사한 Mock 객체를 생성하여 실제 데이터베이스와 독립적으로 테스트할 수 있도록 합니다.
    mockOrm = {
      address: {
        findMany: jest.fn(), // 여러 주소를 조회하는 Mock 메서드
        create: jest.fn(), // 새로운 주소를 생성하는 Mock 메서드
        update: jest.fn(), // 기존 주소를 업데이트하는 Mock 메서드
        delete: jest.fn(), // 주소를 삭제하는 Mock 메서드
        updateMany: jest.fn(), // 여러 주소를 업데이트하는 Mock 메서드
        findUnique: jest.fn(), // 특정 주소를 조회하는 Mock 메서드
      },
      user: {
        findUnique: jest.fn(), // 특정 사용자를 조회하는 Mock 메서드
      },
    };

    // Repository 인스턴스 생성
    // Mock ORM 객체를 주입하여 AddressRepository를 초기화합니다.
    repository = new AddressRepository(mockOrm);
  });

  // createAddress 메서드 테스트
  describe('createAddress', () => {
    // 새로운 주소를 생성하고, 사용자의 첫 번째 주소인 경우 mainAddress를 true로 설정해야 한다
    it('새 주소를 생성하고 첫 번째 주소라면 mainAddress를 true로 설정해야 한다', async () => {
      const input = {
        address: '123 Test St',
        addressName: 'Home',
        userId: '1',
      };
      const createdAddress = { ...input, mainAddress: true, id: '123' };

      // 사용자의 기존 주소가 없는 경우를 Mock
      mockOrm.address.findMany.mockResolvedValue([]); // 사용자의 기존 주소가 없는 경우를 나타내기 위해 빈 배열을 반환
      mockOrm.address.create.mockResolvedValue(createdAddress);

      // 메서드 호출
      const result = await repository.createAddress(input);

      // Mock 메서드가 올바르게 호출되었는지 확인
      expect(mockOrm.address.findMany).toHaveBeenCalledWith({
        where: { userId: '1' },
      });
      expect(mockOrm.address.create).toHaveBeenCalledWith({
        data: { ...input, mainAddress: true },
      });

      // 반환된 결과 확인
      expect(result).toEqual(createdAddress);
    });
  });

  // getAllAddress 메서드 테스트
  describe('getAllAddress', () => {
    it('모든 주소를 반환해야 한다', async () => {
      const addresses = [
        { id: '1', address: '123 Test St', addressName: 'Home' },
        { id: '2', address: '456 Example Ave', addressName: 'Office' },
      ];

      // Mock 데이터 설정
      mockOrm.address.findMany.mockResolvedValue(addresses);

      // 메서드 호출
      const result = await repository.getAllAddress();

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.findMany).toHaveBeenCalled();

      // 반환된 결과 확인
      expect(result).toEqual(addresses);
    });
  });

  // updateAddress 메서드 테스트
  describe('updateAddress', () => {
    it('주어진 데이터로 주소를 업데이트해야 한다', async () => {
      const input = {
        addressId: '123',
        address: 'Updated Address',
        addressName: 'Updated Name',
      };
      const updatedAddress = { ...input };

      // Mock 데이터 설정
      mockOrm.address.update.mockResolvedValue(updatedAddress);

      // 메서드 호출
      const result = await repository.updateAddress(input);

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.update).toHaveBeenCalledWith({
        where: { addressId: '123' },
        data: { address: 'Updated Address', addressName: 'Updated Name' },
      });

      // 반환된 결과 확인
      expect(result).toEqual(updatedAddress);
    });
  });

  // deleteAddress 메서드 테스트
  describe('deleteAddress', () => {
    it('ID로 주소를 삭제해야 한다', async () => {
      const input = { addressId: '123' };

      // Mock 데이터 설정
      mockOrm.address.delete.mockResolvedValue({ id: '123' });

      // 메서드 호출
      const result = await repository.deleteAddress(input);

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.delete).toHaveBeenCalledWith({
        where: { addressId: '123' },
      });

      // 반환된 결과 확인
      expect(result).toEqual({ id: '123' });
    });
  });

  // findUnique 메서드 테스트
  describe('findUnique', () => {
    it('ID로 고유 주소를 반환해야 한다', async () => {
      const address = {
        id: '123',
        address: '123 Test St',
        addressName: 'Home',
      };

      // Mock 데이터 설정
      mockOrm.address.findUnique.mockResolvedValue(address);

      // 메서드 호출
      const result = await repository.findUnique('123');

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.findUnique).toHaveBeenCalledWith({
        where: { addressId: '123' },
      });

      // 반환된 결과 확인
      expect(result).toEqual(address);
    });
  });

  // setMainAddress 메서드 테스트
  describe('setMainAddress', () => {
    // setMainAddress 테스트를 그룹화
    it('새로운 메인 주소를 설정하고 이전 메인 주소를 비활성화해야 한다', async () => {
      const input = { addressId: '123', userId: '1' };

      // Mock 데이터 설정
      mockOrm.address.updateMany.mockResolvedValue({ count: 1 }); // 이전 메인 주소 비활성화를 나타냄
      mockOrm.address.update.mockResolvedValue({
        id: '123',
        mainAddress: true,
      }); // 새 메인 주소 설정

      // 메서드 호출
      const result = await repository.setMainAddress(input);

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.updateMany).toHaveBeenCalledWith({
        where: { userId: '1', mainAddress: true },
        data: { mainAddress: false },
      });
      expect(mockOrm.address.update).toHaveBeenCalledWith({
        where: { addressId: '123' },
        data: { mainAddress: true },
      });

      // 반환된 결과 확인
      expect(result).toEqual({ id: '123', mainAddress: true });
    });
  });

  // getMainAddresses 메서드 테스트
  describe('getMainAddresses', () => {
    it('특정 사용자의 모든 메인 주소를 반환해야 한다', async () => {
      const userId = '1';
      const addresses = [
        { id: '123', mainAddress: true, address: '123 Test St' },
      ];

      // Mock 데이터 설정
      mockOrm.address.findMany.mockResolvedValue(addresses);

      // 메서드 호출
      const result = await repository.getMainAddresses(userId);

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.findMany).toHaveBeenCalledWith({
        where: { userId, mainAddress: true },
      });

      // 반환된 결과 확인
      expect(result).toEqual(addresses);
    });
  });

  // getAllAddressesByUserId 메서드 테스트
  describe('getAllAddressesByUserId', () => {
    it('특정 사용자의 모든 주소를 반환해야 한다', async () => {
      const userId = '1';
      const addresses = [
        { id: '123', address: '123 Test St', addressName: 'Home' },
      ];

      // Mock 데이터 설정
      mockOrm.address.findMany.mockResolvedValue(addresses);

      // 메서드 호출
      const result = await repository.getAllAddressesByUserId(userId);

      // Mock 메서드가 호출되었는지 확인
      expect(mockOrm.address.findMany).toHaveBeenCalledWith({
        where: { userId },
      });

      // 반환된 결과 확인
      expect(result).toEqual(addresses);
    });
  });
});
