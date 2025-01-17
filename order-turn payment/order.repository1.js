// import orderRepository from './order.repository.js';

// const mockOrm = {
//   address: {
//     findFirst: jest.fn(),
//   },
//   Order: {
//     create: jest.fn(),
//     findFirst: jest.fn(),
//     delete: jest.fn(),
//   },
//   Payment: {
//     create: jest.fn(),
//     findFirst: jest.fn(),
//   },
//   User: {
//     update: jest.fn(),
//   },
// };

// describe('orderRepository', () => {
//   const repository = new orderRepository(mockOrm);

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getMainAddresses', () => {
//     it('should return main address for a user', async () => {
//       const userId = 1;
//       const mockAddress = { address: '123 Main St' };
//       mockOrm.address.findFirst.mockResolvedValue(mockAddress);

//       const result = await repository.getMainAddresses(userId);

//       expect(mockOrm.address.findFirst).toHaveBeenCalledWith({
//         where: { userId, mainAddress: true },
//         select: { address: true },
//       });
//       expect(result).toEqual(mockAddress);
//     });
//   });

//   describe('createOrder', () => {
//     it('should create a new order', async () => {
//       const mockOrderData = {
//         userId: 1,
//         restaurantId: 1,
//         cartId: 1,
//         status: 'PREPARING',
//         paymentId: 1,
//       };
//       const mockCreatedOrder = { orderId: 1, ...mockOrderData };
//       mockOrm.Order.create.mockResolvedValue(mockCreatedOrder);

//       const result = await repository.createOrder(mockOrderData);

//       expect(mockOrm.Order.create).toHaveBeenCalledWith({
//         data: mockOrderData,
//       });
//       expect(result).toEqual(mockCreatedOrder);
//     });
//   });

//   describe('updateUserPoints', () => {
//     it('should update user points', async () => {
//       const userId = 1;
//       const points = 100;
//       const mockUpdatedUser = { userId, point: points };
//       mockOrm.User.update.mockResolvedValue(mockUpdatedUser);

//       const result = await repository.updateUserPoints({ userId, points });

//       expect(mockOrm.User.update).toHaveBeenCalledWith({
//         where: { userId },
//         data: { point: points },
//       });
//       expect(result).toEqual(mockUpdatedUser);
//     });
//   });
// });
