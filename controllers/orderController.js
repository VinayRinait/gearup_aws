const Order = require('../models/orderModel.js');
const Razorpay = require('razorpay');
const { KEY_ID, KEY_SECRET } = require("../config/config");
const crypto = require("crypto");


const instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET
})

// PlaceOrder
exports.placeOrder = async(req,res,next) =>{
    try{
        let receiptId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
        // console.log(orderId)
     let options = {
        amount : req.body.total_amount * 100,
        currency : 'INR',
        receipt: receiptId
     }
    let order = await instance.orders.create(options);
    console.log(order)
    let new_order = {
        order_id            :       order.id,
        products            :       req.body.products,
        user_id             :       req.body.user_id,
        quantity            :       req.body.quantity,
        total_amount        :       req.body.total_amount,
        payment_method      :       req.body.payment_method,
        payment_status      :       0,
        status              :       req.body.status,
        receiptId           :       receiptId
    }
        let create_order = await Order.create(new_order)
        if(create_order){
            res.status(200).json({code:200, status:1, message:"Order placed successfully", order_id: create_order.order_id})
        }
        else{
            res.status(401).json({ code: 400, status: 0, message: "Order not placed Try Again ", data: {} })
        }
    }catch(error){
      console.log(error)
        res.status(401).json({ code: 400, status: 0, message: "Getting Error while place Order" })
    }
}

exports.verifyPayment = async(req, res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');
        console.log("sig received " ,req.body.response.razorpay_signature);
        console.log("sig generated " ,expectedSignature);
    if(expectedSignature === req.body.response.razorpay_signature){
        let orderUpdate = await Order.findOneAndUpdate({order_id: req.body.response.razorpay_order_id},{
            transction_id : req.body.response.razorpay_payment_id,
            payment_status : 1
        })
        if(orderUpdate){
            return res.status(200).json({status:1, message: "Payment success"})
        }
    }else{
        return res.status(200).json({status:1, message: "Payment Fail"})
    }
}

// getAllOrders
exports.getAllOrder = async(req,res,next)=>{
    try{
        console.log("all Order")
        let order_find = await Order.find().populate("user_id").populate('products.product_id').sort({createdAt:-1})
        if(order_find){
            res.status(200).json({code:200, status:1, message:"All orders", data:order_find})
        }
        else{
            res.status(401).json({ code: 400, status: 0, message: "Orders not found.. Try Again ", data: {} })
        }
    }catch{

        res.status(401).json({ code: 400, status: 0, message: "Getting Error while Searching for orders" })
    }
}

// getOrderByUser
exports.getOrderByUser = async(req,res,next)=>{
    try{
        let order_find = await Order.find({user_id : req.body.user_id}).populate("user_id",['fullName']).populate("products.product_id",['_id', 'productName', 'price', 'productDescription', 'productWeight', 'productImage.path','status']).sort({createdAt:-1})

        if(order_find){
            res.status(200).json({code:200, status:1, message:"Order by user", data:order_find})
        }
        else{
            res.status(401).json({ code: 400, status: 0, message: "Order not found.. Try Again ", data: {} })
        }
    }catch{
        res.status(401).json({ code: 400, status: 0, message: "Getting Error while searching for order" })
    }
}

// getOrderById
exports.getOrderById = async(req,res,next)=>{
    try{
        let order_find = await Order.find({_id : req.body.order_id}).populate('user_id').populate('products.product_id')
        if(order_find){
            res.status(200).json({code:200, status:1, message:"Order by order id", data:order_find})
        }
        else{
            res.status(401).json({ code: 400, status: 0, message: "Order not found.. Try Again ", data: {} })
        }
    }catch{
        res.status(401).json({ code: 400, status: 0, message: "Getting Error while searching for order" })
    }
}


exports.updateOrder = async(req, res)=> {
    try{
        let data = {...req.body}
        let update_order = await Order.findByIdAndUpdate({_id: data.order_id},{
                                                            delivery_person_id  : data.delivery_person_id,
                                                            merchant_id         : data.merchant_id
        },{new: true})
        if(update_order){
            res.status(200).json({code:200, status:1, message:"Order Update successfully", data:update_order})
        }
        else{
            res.status(401).json({ code: 400, status: 0, message: "Order Update Fail.. Try Again ", data: {} })
        }
       }catch{
        res.status(401).json({ code: 400, status: 0, message: "Getting Error while searching for order" })
    }
}

exports.updateOrderDeliveryStatus = async (req, res)=>{
    try{
        let updateStatus = await Order.findOneAndUpdate({order_id: req.body.order_id},{
            deliveryStatus: 1
        },{new: true})
        if(updateStatus){
            res.status(200).json({ code:200, status: 0, message: "Delivery Status Update Succefully", data: updateStatus })
        }else{
            res.status(401).json({ code: 400, status: 0, message: "Order Update Fail.. Try Again ", data: {} })
        }
    }catch(error){
        console.log(error)
    }
}