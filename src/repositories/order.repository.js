import { prisma } from '../utils/prisma/index.js';

class OrderRepository {
    #orm;

    constructor(orm) {
        this.#orm = orm;
    }

    // 사용자 조회
    getUserById = async (userId) => {
        return await this.#orm.User.findFirst({
            where: { userId }
        });
    }

    // 결제 생성
    createPayment = async ({  userId, restaurantId, total_price }) => {
        return await this.#orm.Payment.create({
            data: {
                userId,
                restaurantId,
                total_price
            }
        });
    }

    // 주문 생성
    createOrder = async ({  userId, restaurantId, cartId, status, paymentId }) => {
        return await this.#orm.Order.create({
            data: {
                userId,
                restaurantId,
                cartId,
                status,
                paymentId
            }
        });
    }

    // 포인트 업데이트
    updateUserPoints = async ({  userId, points }) => {
        return await this.#orm.User.update({
            where: { userId },
            data: { point: points }
        });
    }

    // 주문 조회
    getOrderById = async (orderId) => {
        return await this.#orm.Order.findFirst({
            where: { orderId }
        });
    }

    // 결제 조회
    getPaymentById = async (paymentId) =>  {
        return await this.#orm.Payment.findFirst({
            where: { paymentId }
        });
    }

    // 포인트 복원
    restoreUserPoints = async ({  userId, refundedAmount }) => {
        return await this.#orm.User.update({
            where: { userId },
            data: {
                point: {
                    increment: refundedAmount
                }
            }
        });
    }

    // 주문 삭제
    deleteOrder = async (orderId) =>  {
        return await this.#orm.Order.delete({
            where: { orderId }
        });
    }

    // 결제 삭제
    deletePayment = async (paymentId) =>  {
        return await this.#orm.Payment.delete({
            where: { paymentId }
        });
    }

    // 주문 상태 조회
    getOrderStatus = async (orderId) =>  {
        const order = await this.#orm.Order.findFirst({
            where: { orderId },
            select: { status: true }
        });
        return order?.status;
    }
}

export default new OrderRepository(prisma);
