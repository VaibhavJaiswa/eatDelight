const shortid = require('shortid')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Transaction = require('../model/transcation')

const razorpay = new Razorpay({
    key_id:"rzp_test_A9qfCBXsRzXJZ6",
    key_secret:"0sw1mtZVZQxhJZN1oUeqz7Qm"
})

exports.completePayment = async(req,res)=>{
    console.log("Payment Initiated")
    const amount=req.body.amount;
    const currency = "INR"
    const payment_capture = 1

    const options = {
        amount:amount*100,
        currency,
        receipt:shortid.generate(),
        payment_capture
    }

    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.status(200).json(response)
    }catch(error){
        console.log(error)
    }
}

exports.saveTransaction=(req,res)=>{
    console.log("Saving Transaction!!!!")
    const generated_signature = crypto.createHmac('sha256',razorpay.key_secret)
    generated_signature.update(req.body.razorpay_order_id+"|"+req.body.transactionid)

    if(generated_signature.digest('hex')==req.body.razorpay_signature){
        console.log("Processsing")
        const transaction = new Transaction({
            transactionid:req.body.transactionid,
            transactionamount:req.body.transactionamount
        })
        transaction.save((err,saveT)=>{
            if(err)
                return res.status(500).send("Some problem occured")
            res.send({transaction:saveT})    

        })
    }
    else{
        console.log("Failed Saving")
        return res.send("Failed !!!!")
    }

}
