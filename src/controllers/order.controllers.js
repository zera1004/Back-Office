import OrderServices from "../services/order.services.js"

class OrderControllers{

    #services
    constructor(services){
        this.#services = services
    }


    async createOrder(req ,res){
        const {userId,restaurantId,cartId,status,total_price} = req.body
        try{
        const result = await this.#services.createOrder({userId,restaurantId,cartId,status,total_price})
        return res.status(201).json({
            message: `주문이 완료되었습니다(남은금액:${result}원)`})
        }
        catch(error){
            return res.json({message:error.message})
        }
    }


    async deleteOrder(req ,res){
        const {id: orderId} = req.params
        try{
        const result = await this.#services.deleteOrder({orderId})
        return res.status(200).json({
            message:`주문이 취소되었습니다(환불금액:${result}원)`
        })}
        catch(error){
            return res.json({message:error.message})
        }
        }
    
    
    async checkOrder(req ,res){
        const {id: orderId} = req.params
        try{
        const result = await this.#services.checkOrder({orderId})
        return res.status(200).json({
            message:`현재 배달상황은: ${result}`})
        }
        catch(error){
            return res.json({message:error.message})
        }
    }
}


export default new OrderControllers(OrderServices)