// const Merchant = require("../models/merchantModel.js");
const User = require("../models/userModel.js");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/config");
const Order = require("../models/orderModel")  
const mongoose = require('mongoose')             


exports.login = async (req,res,next)=>{
  let Obj = {}
 let  merchant = await User.findOne({mobileNo : req.body.mobileNo });
 if(merchant){
      bcrypt.compare(req.body.password, merchant.password , function (err, result){
         if(result == true){
                            const token = jwt.sign({
                                    email:merchant.email,
                                    userId:merchant._id
                                },JWT_SECRET,
                                {
                                    expiresIn:"100h"
                            });
                            Obj.merchant = merchant;
                            Obj.token = token;
              return  res.status(200).json({ code:200,status:1,message : "Login succesfull",data : Obj })            
         }else{
            return  res.status(200).json({ code:200,status:0,message : "Please check Inputs",data : {} })         
         }
      })
 }else{
     return res.status(200).json({ code:200,status:0, message: `The Mobile is not associated with any account. Double-check your Mobile and try again.`, data : {}});
 }
}

exports.merchantRegister = async (req,res)=>{
    try{
        let Obj = {};
        let findMerchant= await User.findOne({mobileNo: req.body.mobileNo, email: req.body.email})
        if(findMerchant){
            return res.status(200).send({ code:200,status:0, message:"Merchant Already registerd",data:{} })  
        }
        let hash  = await bcrypt.hashSync(req.body.password,10);
        let merchant = await User.create({
            merchantName        : req.body.merchantName,
            email               : req.body.email,
            mobileNo            : req.body.mobileNo,
            password            : hash  ,
            city                : req.body.city,
            state               : req.body.state,
            address             : req.body.address,
            role                : "merchant"         
        }) 
        if(merchant){
            const token = jwt.sign({
                                    email:merchant.email,
                                    userId:merchant._id
                                },JWT_SECRET,
                                {
                                    expiresIn:"100h"
                            });
                            Obj.merchant = merchant;
                            Obj.token = token;
            res.status(200).json({ code:200,status:1,message : "Merchant register succesfull",data : Obj })
        }else{
            res.status(401).json({ code:400,status:0,message : "Try Again ",data : {} })
        }     
    }  catch(error){
        console.log(error,"<===errpr")
    res.status(401).json({ code:400,status:0,message : "Getting Error while register"})
    }
}

exports.getMerchant= async (req, res, next) => {
    try{
            let merchant = await User.find({role:"merchant",is_deleted: 0}).select(['merchantName','email','mobileNo','city', 'state', 'address', 'role', 'status' ])
            if(merchant != "") {
                return res.status(200).json({status: 1, message: 'Merchant Details fetched success!', data: merchant})
            }
            return res.status(200).json({status: 1, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getMerchantById = async (req, res, next) => {
    try{
            let merchant = await User.find({_id: req.body.merchantId, role:"merchant",is_deleted: 0}).select(['merchantName','email','mobileNo','city', 'state', 'address', 'role', 'status' ])
            if(merchant != "") {
                return res.status(200).json({status: 1, message: 'Merchant Details fetched success!', data: merchant})
            }
            return res.status(200).json({status: 1, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.deleteMerchant=async (req,res)=>{
     let  data = await User.findByIdAndUpdate({_id : req.body.merchantId, role:"merchant",is_deleted:0 },{is_deleted:1});
     if(data){
            return res.status(200).json({status:1, message:"Merchant Deleted succesfully", data:data}) 
     }else{
         return res.status(200).json({status:0, message:"Data Not Found", data:{}})
     }
}

exports.updateMerchant = async (req, res, next) => {
    try{
        let data = await User.findByIdAndUpdate({_id:req.body.merchantId,role:"merchant"},{ 
                                                    merchantName        : req.body.merchantName,
                                                    email               : req.body.email,
                                                    mobileNo            : req.body.mobileNo,
                                                    city                : req.bodycity,
                                                    state               : req.bodystate,
                                                    address             : req.bodyaddress,
                                                    status              : req.body.status
                                          } ,{new:true});
        if(data != ""){
            return res.status(200).json({status:1, message:'Merchant Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }catch(error){
        console.log(error)
    }
};

exports.getOrderByMerchant = async (req, res) => {
    try{
        let getOrder = await Order.find({merchant_id: req.body.merchant_id}).populate("user_id",['fullName','mobileNo', 'city', 'state', 'address']).populate("products.product_id",['_id', 'productName', 'productDescription', 'productWeight', 'productImage.path','status']).populate('merchant_id', ['merchantName', 'mobileNo', 'city', 'state', 'address'])
        if(getOrder){
            return res.status(200).json({status:1, message:'Merchant Order Found Succesfully',data:getOrder})
        }else{
            return res.status(200).json({status:1, message:'No Order Found'})
        }
    }catch(error){
        console.log(error)
    }
}

exports.getMerchantPaymet = async (req, res) =>{
    try{
        // let getOrder = await Order.find({merchant_id: req.body.merchant_id, deliveryStatus: 1}).select(total_amount)
        let getOrder = await Order.aggregate([

            { $match: {
                merchant_id: new mongoose.Types.ObjectId(req.body.merchant_id),
                deliveryStatus: 1
            }},
        
            // { $project: {
            //     total_amount: { $sum: "$total_amount" }
            // }}
            {
                $group: {
                  _id: null,
                  totalAmount: { $sum: "$total_amount" }
                }
              }
        ])
        if(getOrder){
            return res.status(200).json({status:1, message:'Merchant Order Found Succesfully',data:getOrder})
        }else{
            return res.status(200).json({status:1, message:'No Order Found'})
        }
    }catch(error){
        console.log(error)
    }
}