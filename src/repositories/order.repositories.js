import prisma from "../utils/prisma/index.js"

class OrderRepository{

    #orm
    constructor(orm){
        this.#orm = orm
    }

    async createOrder ({userId,restaurantId,cartId,status,total_price}) {
        try{
            const order_user = await this.#orm.User.findfirst({
                where: {userId}
            })
            
            if(order_user.point<total_price){
                throw new Error("음식을 주문하기 위한 포인트가 부족합니다")
            }
            
            const calc_point = order_user.point - total_price // 남은 금액
            
            await this.#orm.User.update({
                where: {userId},
                data: {point:calc_point}
            })
            
            const order_payment = await this.#orm.Payment.create({ // 이건 레포지토리만
                data:{
                    restaurantId,
                    userId,
                    total_price,
                }
            })

            await this.#orm.Order.create({ // 이건 레포지토리만
                data:{
                    paymentId:order_payment.paymentId,
                    restaurantId,
                    cartId,
                    userId,
                    status,
                }

            })
        
            return calc_point
        }
    catch(error){
        if(error.message === "음식을 주문하기 위한 포인트가 부족합니다"){
            throw error
        }
        else{
        throw new Error("주문을 하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
        }
    }
    }



    async deleteOrder ({orderId}) {
        try{
            const order_user = await this.#orm.order.findfirst({
            where: {orderId}
            })
            
            const order_point = await this.#orm.payment.findfirst({
                where: {paymentId:order_user.paymentId}          
            })

            await this.#orm.user.update({
                where:{userId:order_user.userId},
                data: {
                    point: {
                        increment: order_point
                    }
                }
            })

            await this.#orm.payment.delete({
                where: {paymentId:order_user.paymentId}
            })

            await this.#orm.order.delete({
                where: {orderId}
            })

            return order_point
        }
        catch(error){
            throw new Error("주문을 취소 하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
        }
    }



    async checkOrder ({orderId}) {
        try{
            const check_order = await this.#orm.order.findfirst({
                where: {orderId},
                select: {status: true}
            })

            const list = {
                PREPARING: "준비중",
                DELIVERING: "배달중",
                DELIVERED: "배달완료",
            }

            return list[check_order.status]
        }
        catch(error){
            throw new Error("현재 배달사항을 체크하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
            }
        }
    
    }




export default new OrderRepository(prisma)