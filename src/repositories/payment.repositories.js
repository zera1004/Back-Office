import prisma from "../utils/prisma/index.js"

class paymentsRepository{

    #orm
    constructor(orm){
        this.#orm = orm
    }

    async payments ({userId ,orderId, total_price}) {
        try{
        const user = await this.#orm.user.findUnique({
            where: {userId}
        })

        if(user.point<total_price){ 
            throw new Error("포인트가 부족합니다.")
        }

        const payment = await this.#orm.payment.create({
            data:{
                userId,
                orderId,
                total_price
            }
        })

        const update = await this.#orm.user.update({
            where: {userId},
            data: {
                point: user.point - total_price
            }
        })

        return update.point
    }
    catch(error){
        if(error.message === "포인트가 부족합니다."){
            throw error
        }
        else{
            throw new Error("payment에 에러가 발생했습니다 관리자에게 문의 바람")
        }
    }
    
}

}


export default new paymentsRepository(prisma)