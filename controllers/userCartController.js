const Cart = require("../models/userCartModel.js");
const mongoose = require("mongoose")


exports.addToCart = async(req, res)=>{
    try{
        let data = {...req.body}
        let findCart = await Cart.findOne({user_id: data.user_id})
        if(findCart){
            for(i =0; i< data.products.length; i++){
                findCart.products.push(data.products[i])
            }
            let updateCart = await findCart.save()
            if(updateCart){
                return res.status(200).json({status:1, message:'Product Added To Cart....',data:updateCart})
            }else{
                return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
            }
        }else{
            let addProductToCart = await Cart.create({
                products : data.products,
                user_id  : data.user_id
            })
            if(addProductToCart){
                return res.status(200).json({status:1, message:'Product Added To Cart....',data:addProductToCart})
            }else{
                return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
            }
        }
    }catch(error){
        console.log(error)
    }
}


exports.removeProductFromCart = async(req, res) => {
    try{
        let data = {...req.body}
        let findCart = await Cart.findOne({user_id: data.user_id})
        for(var i in findCart.products){
            if(findCart.products[i].product_id== data.product_id.toString()){
                findCart.products.splice(i,1);
                break;
            }
        }
        let saveData = await findCart.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'done',data:findCart})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.getUserCart = async(req, res) => {
    try{
        let findCart = await Cart.findOne({user_id: req.body.user_id}).populate('user_id').populate('products.product_id')
        if(findCart){
        	return res.status(200).json({status:1, message:'Cart Find ',data:findCart})
        }{
        	return res.status(401).json({ code:200,status:0,message : "Cart Not Found! ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}