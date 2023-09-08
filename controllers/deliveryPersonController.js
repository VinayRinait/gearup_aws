const User = require("../models/userModel.js");
const Assignorder = require("../models/assignorderModel")
const Order = require("../models/orderModel")               
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.deliveryPersonRegister = async (req, res) => {
    try {
        let finddeliveryPerson = await User.findOne({ mobileNo: req.body.mobileNo, email: req.body.email })
        if (finddeliveryPerson) {
            return res.status(200).send({ code: 200, status: 0, message: "Delivery Person Already registerd", data: {} })
        }
        let hash = await bcrypt.hashSync(req.body.password, 10);
        console.log(req.body.mobileNo)
        let deliveryPerson = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: hash,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            role: 'deliveryPerson'
        })
        if (deliveryPerson) {
            res.status(200).json({ code: 200, status: 1, message: "deliveryPerson register succesfull", data: {} })
        } else {
            res.status(401).json({ code: 400, status: 0, message: "Try Again ", data: {} })
        }
    } catch (error) {
        res.status(401).json({ code: 400, status: 0, message: "Getting Error while register" })
    }
}

exports.getDeliveryPerson = async (req, res, next) => {
    try {
        let deliveryPerson = await User.find({ role: "deliveryPerson" }).select(['fullName', 'email', 'mobileNo', 'city', 'state', 'address', 'role', 'status'])
        if (deliveryPerson != "") {
            return res.status(200).json({ status: 1, message: 'deliveryPerson Details fetched success!', data: deliveryPerson })
        }
        return res.status(200).json({ status: 1, message: 'data Not Found!', data: {} })
    }
    catch (error) {
        console.log(error)
        return res.status(200).json({ status: 0, message: 'try again later!' })
    }
};

exports.getDeliveryPersonById = async (req, res, next) => {
    try {
        let deliveryPerson = await User.find({ _id: req.body.deliveryPersonId, is_deleted: 0 }).select(['fullName', 'email', 'mobileNo', 'city', 'state', 'address', 'role', 'status'])
        if (deliveryPerson != "") {
            return res.status(200).json({ status: 1, message: 'deliveryPerson Details fetched success!', data: deliveryPerson })
        }
        return res.status(200).json({ status: 1, message: 'data Not Found!', data: {} })
    }
    catch (error) {
        console.log(error)
        return res.status(200).json({ status: 0, message: 'try again later!' })
    }
};

exports.deleteDeliveryPerson = async (req, res) => {
    let data = await User.findByIdAndUpdate({ _id: req.body.deliveryPersonId, is_deleted: 0 }, { is_deleted: 1 });
    if (data) {
        return res.status(200).json({ status: 1, message: "DeliveryPerson Deleted succesfully", data: data })
    } else {
        return res.status(200).json({ status: 0, message: "Data Not Found", data: {} })
    }
}

exports.updateDeliveryPerson = async (req, res, next) => {
    try {
        let data = await User.findByIdAndUpdate({ _id: req.body.deliveryPersonId }, {
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            status: req.body.status
        }, { new: true });
        if (data != "") {
            return res.status(200).json({ status: 1, message: 'DeliveryPerson Updated Succesfully', data: data })
        }
        return res.status(200).json({ status: 0, message: 'Data Not Found', data: {} })
    } catch (error) {
        console.log(error)
    }
};

exports.forgetPassword = async (req, res, next) => {
    try {
        let generateOtp = await generateOTP()
        let data = await User.findOneAndUpdate({ mobileNo: req.body.mobileNo, is_deleted: 0 }, { otp: generateOtp })
        if (data != "") {
            return res.status(200).json({ status: 1, message: 'otp Save Succesfully', data: {} })
        }
        return res.status(200).json({ status: 0, message: 'Data Not Found', data: {} })
    } catch (error) {
        console.log(error)
    }
};


exports.submitForgetPassword = async (req, res, next) => {
    try {
        let hash = await bcrypt.hashSync(req.body.password, 10);
        console.log(req.body.otp)
        console.log(req.body.password)
        console.log(req.body.deliveryPersonId)
        let data = await User.findOneAndUpdate({ otp: req.body.otp, _id: req.body.deliveryPersonId }, {
            password: hash,
        });
        if (data) {
            return res.status(200).json({ status: 1, message: 'Password Updated Succesfully!', data: {} })
        }
        return res.status(200).json({ status: 0, message: 'Wrong Otp', data: {} })
    } catch (error) {
        console.log(error)
    }
};

//assign order to delivery person

// exports.assignOrder = async(req,res,next) => {
//     try {
//         let deliveryPersonId = req.body.deliveryPersonId
//         let order_id = req.body.order_id

//         let productByOrderId = await Order.findById({_id:order_id})
//         console.log(productByOrderId)

//         // let assignOrder = await Assignorder.create({
//         //     deliveryPersonId : req.body.deliveryPersonId,
//         //     order_id : req.body.order_id
//         // })
//         if (productByOrderId) {
//             return res.status(200).json({ status: 1, message: "Order assigned to delivery person Succesfully"})
//         } else {
//             return res.status(200).json({ status: 0, message: "Error while assigning order to delivery person"})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.getAssignOrderByDeliveryPerson = async(req,res,next) => {
//     try {
//         let assignOrder = await Assignorder.find({
//             deliveryPersonId : req.body.deliveryPersonId,
//         }).populate('order_id').populate("user_id")
//         if (assignOrder) {
//             return res.status(200).json({ status: 1, message: "Order assigned to delivery person",data:assignOrder})
//         } else {
//             return res.status(200).json({ status: 0, message: "Order not found"})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.getAllDeliveryPersonOrder = async(req, res) => {
    try{
        let findOrder = await Order.find({delivery_person_id: req.body.delivery_person_id}).populate("user_id",['fullName','mobileNo', 'city', 'state', 'address']).populate("products.product_id",['_id', 'productName', 'productDescription', 'productWeight', 'productImage.path','status']).populate('merchant_id', ['merchantName', 'mobileNo', 'city', 'state', 'address'])
        if(findOrder){
            return res.status(200).json({ status: 1, message: "You'r Assigned Order Found",data:findOrder})
        }else{
            return res.status(200).json({ status: 1, message: "No Order Assigned To You",data:findOrder})
        }
    } catch (error) {
                console.log(error)
    }
}

exports.getAllActiveDeliveryPerson = async(req, res) => {
    try{
        let getDeliveryPerson = await User.find({ role: "deliveryPerson", status: 0, is_deleted: 0}).select(['fullName', 'email', 'mobileNo', 'city', 'state', 'address', 'role', 'status'])
        if(getDeliveryPerson){
            return res.status(200).json({ status: 1, message: "Active Delivery Person Found",data:getDeliveryPerson})
        }else{
            return res.status(200).json({ status: 0, message: "No Active Delivery Person Found!"})
        }
    } catch (error) {
        console.log(error)
    }
}

function generateOTP() {
    // Generate a random 4-digit number
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}