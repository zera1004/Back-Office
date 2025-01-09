import prisma from "../utils/prisma/index.js"

class OrderRepository{

    #orm
    constructor(orm){
        this.#orm = orm
    }

    async createOrder ({userId,restaurantId,cartId,status}) {
        try{
                await this.#orm.order.create({
                data:{userId,restaurantId,cartId,status}
            })
        }
    catch(error){
        throw new Error("order를 생성하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
    }
    }



    async deleteOrder ({orderId}) {
        try{
                await this.#orm.order.delete({
                where: {orderId}
            })

        }
        catch(error){
            throw new Error("order를 삭제하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
        }
    }



    async checkOrder ({orderId}) {
        try{
            const result = await this.#orm.order.findfirst({
                where: {orderId},
                select: {status: true}
            })
            if(!result){
                throw new Error("주문을 찾을수가 없습니다")
            }
            return result
        }
        catch(error){
            if(error.message == "주문을 찾을수가 없습니다"){
                throw error
            }
            else{
            throw new Error("order를 체크하던 도중 에러가 발생했습니다 관리자에게 문의 바람")
            }
        }
    }

}


export default new OrderRepository(prisma)