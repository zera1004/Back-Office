import paymentRepository from "../repositories/payment.repositories.js"


class paymentServices{

    #repository
    constructor(repository){
        this.#repository = repository
    }
    
    async payment({ userId, orderId, total_price }){
        try{
            return await this.#repository.payment({ userId, orderId, total_price })
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    
}


export default new paymentServices(paymentRepository)