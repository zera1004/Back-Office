import OrderServices from "../services/order.services.js"

class OrderControllers{

    #services
    constructor(services){
        this.#services = services
    }

    // 주문 생성 
    async createOrder(req ,res){
        const {restaurantId,cartId,status,total_price} = req.body
        const {userId} = req.user;
        try{
        const result = await this.#services.createOrder({userId,restaurantId,cartId,status,total_price})
        return res.status(201).json({
            message: `주문이 완료되었습니다(남은금액:${result}원)`})
        }
        catch(error){
            return res.json({message:error.message})
        }
    }

    // 주문 취소
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
    
    // 주문 확인
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