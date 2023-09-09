const Product = require("../models/productModel.js");
const fs = require('fs');
const {URL} = require('../config/config')
exports.addProduct = async (req, res, next) => {
    try {
        let data = { ...req.body };
        let imgArray = [];

        for (let i = 0; i < data.productImage.length; i++) {
            try {
                let buff = new Buffer.from(data.productImage[i].path, 'base64');
                let fileName = Date.now() + i + '.png';
                let filePath = "public/product_images/" + fileName;
        
                // Create the directory if it doesn't exist
                fs.mkdirSync("public/product_images", { recursive: true });
        
                // Write the file
                fs.writeFileSync(filePath, buff);
        
                let dbFilePath = URL + '/product_images/' + fileName;
                imgArray.push({ path: dbFilePath.toString() });
            } catch (error) {
                console.error("Error while creating and writing the file:", error);
            }
        }
        let pdata = await Product.create({
            productName: data.productName,
            price: data.price,
            Category: data.Category,
            productDescription: data.productDescription,
            productImage: imgArray,
            categoryId: req.body.categoryId,
        });

        if (pdata) {
            return res.status(200).json({ status: 1, message: 'Product Submitted Successfully', data: pdata });
        } else {
            return res.status(401).json({ code: 200, status: 0, message: 'Try Again', data: {} });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error', data: {} });
    }
};
exports.getProduct = async (req, res, next) => {
    try{
            let data = await Product.find({is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};


exports.getProductById = async (req, res, next) => {
    try{
            let data = await Product.find({_id: req.body.productId, is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getProductByCategory = async (req, res, next) => {
    try{
            let data = await Product.find({CategoryId: req.body.CategoryId, is_deleted: 0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getProductByMerchant = async (req, res, next) => {
    try{
            let data = await Product.find({merchantId:req.body.merchantId, is_deleted:0})
            if(data != "") {
                return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.deleteProduct=async (req,res)=>{
     let  data = await Product.findOneAndUpdate({_id : req.body.productId,is_deleted:0 },{is_deleted:1});
     if(data){
            return res.status(200).json({status:1, message:"Product Deleted succesfully", data:{}}) 
     }else{
         return res.status(200).json({status:0, message:"Data Not Found", data:{}})
     }
}

exports.updateProduct = async (req, res, next) => {
    try{
        // let images = req.body.images;
        // if( req.files != undefined){
        //     console.log(":Test,=")
        //     productImage = req.files;
        // }
        // if(productImage != ""){
        //     for(i=0; i< productImage.length; i++){
        //         productImage[i].path = "https://www.phoolvala.com/product_images/"+productImage[i].filename
        //     }
        if(productImage != ""){
            let imgArray = [];
            for(i = 0; i<data.productImage.length; i++){
                let buff = new Buffer.from(data.productImage[i].path, 'base64');
                let fileName = Date.now()+i+'.png'
                let filePath = "public/product_images/"+ fileName
                fs.writeFileSync(filePath, buff);
                let dbFilePath = URL+'/product_images/'+fileName
                imgArray.push({path:dbFilePath.toString()})
            }
        	let data = await Product.findOneAndUpdate({_id:req.body.productId},{ 
                                          productName			: req.body.productName,
                                          price					: req.body.price,
                                          Category   			: req.body.Category,
                                          productDescription	: req.body.productDescription,
                                         
                                          productImage 			: imgArray,
                                          status                : req.body.status,
                                          categoryId            : req.body.categoryId,
                                                 
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }else{
    	let data = await Product.findOneAndUpdate({_id:req.body.productId},{ 
                                            productName			: req.body.productName,
                                            price				: req.body.price,
                                            Category   			: req.body.Category,
                                            productDescription	: req.body.productDescription,
                                            productQuntity    	: req.body.productQuntity,
                                            // productImage 		: productImage,
                                            status              : req.body.status,
                                            productWeight         : req.body.productWeight,
                                            categoryId            : req.body.categoryId,
                                            merchantId            : req.body.merchantId,                                     	
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }
        
    }catch(error){
        console.log(error)
    }
};
