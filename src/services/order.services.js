import OrderRepository from "../repositories/order.repositories.js"


class OrderServices{

    #repository
    constructor(repository){
        this.#repository = repository
    }

    async createOrder({userId,restaurantId,cartId,status,total_price}) {
        try{
        return await this.#repository.createOrder({userId,restaurantId,cartId,status,total_price})
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async deleteOrder({orderId}){
        try{
        return await this.#repository.deleteOrder({orderId})
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    
    
    async checkOrder({orderId}){
        try{
        return await this.#repository.checkOrder({orderId})
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    
}


export default new OrderServices(OrderRepository)