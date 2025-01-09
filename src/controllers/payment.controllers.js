import paymentServices from "../services/payment.services.js"

class paymentControllers{

    #services
    constructor(services){
        this.#services = services
    }


    async payment(req ,res){
        const {userId ,orderId, total_price} = req.body

        try{
            const result = await this.#services.payment({userId ,orderId, total_price})
            return res.status(200).json({
            message: `구매가 정상적으로 되었습니다. 바로 주문을 하세요!(남은금액:${result}원)`,})
        }
        catch(error){
            return res.json({
                message: error.message
            })
        }


    
    }
}

export default new paymentControllers(paymentServices)