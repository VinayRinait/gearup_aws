const Product = require("../models/productModel.js");
const mongoose = require("mongoose")


exports.getProductByCategory = async (req, res, next) => {
    try{
            let data = await Product.find({categoryId: req.params.categoryId, is_deleted: 0}).populate('categoryId',['categoryName'])
            if(data != "") {
                return res.render('productList',{title: 'All Product',data:data, isAuth: req.session.isLoggedIn, })
            }
            return res.render('productList',{title: 'All Product',data: {}, isAuth: req.session.isLoggedIn, })
        }
        catch(error){
            console.log(error)
            return res.redirect('/')
        }
};

exports.getAddProduct = async (req, res, next)=> {
    res.render('addProduct',{title: "Add Product", isAuth: req.session.isLoggedIn})
}

exports.addProduct = async (req, res, next) => {
    try{
        // if(req.files == ""){
        //    return res.status(200).json({status:0, message:'Image Must not be Empty',data:{}})
        // }
        let data = {...req.body};
        let productImage = req.files
        for(i=0; i< productImage.length; i++){
            productImage[i].path = "https://www.bloomb.in/product_images/"+productImage[i].filename
        }
        let pdata = await Product.create({ 
                                          productName			: data.productName,
                                          price					: data.price,
                                          Category			    : data.Category,
                                          productDescription	: data.productDescription,
                                          productQuantity       : data.productQuantity,
                                          productImage 			: productImage,
                                          categoryId            : req.body.categoryId,
                                          merchantId            : req.body.merchantId,
                                          productWeight         : req.body.productWeight
                                          } );
        if(pdata != ""){
        	// return res.status(200).json({status:1, message:'Product Submited Succesfully',data:pdata})
            return res.redirect('/categorys/getAllCategory',{title: "All Products", isAuth : req.session.isLoggedIn})
        }else{
        	// return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
            return res.redirect('/products/getAddProduct',{title: "All Products", isAuth : req.session.isLoggedIn})

        }
    	
    }catch(error){
        console.log(error)
    }
};


exports.getProductById = async (req, res, next) => {
    try{
            let data = await Product.find({_id: req.params.productId, is_deleted: 0})
            if(data != "") {
                return res.render('singleProduct', {title: "Single Product", isAuth: req.session.isLoggedIn})
            }
            return res.redirect('/categorys/getAllCategory', {title: "All Category", isAuth: req.session.isLoggedIn})
        }
        catch(error){
            console.log(error)
            return res.redirect('/categorys/getAllCategory', {title: "All Category", isAuth: req.session.isLoggedIn})
        }
};

exports.deleteProduct=async (req,res)=>{
    try{
        let  data = await Product.findOneAndUpdate({_id : req.params.productId,is_deleted:0 },{is_deleted:1});
        if(data){
            return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
        }else{
            return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
        }
    }
    catch(error){
        console.log(error)
        return res.redirect('/categorys/getAllCategory', {title: "All Category", isAuth: req.session.isLoggedIn})
    }
}

exports.getUpdateProduct = async(req, res) => {
    try{
        let getProduct = await Product.findById({_id: req.params.productId, is_deleted: 0})
        res.render('editProduct',{title: 'Edit Product', data: getProduct, isAuth: req.session.isLoggedIn})
    }
    catch(error){
        console.log(error)
        return res.redirect('/categorys/getAllCategory', {title: "All Category", isAuth: req.session.isLoggedIn})
    }
}

exports.updateProduct = async (req, res, next) => {
    try{
        // let images = req.body.images;
        let productImage;
        if( req.files != undefined){
            console.log(":Test,=")
            productImage = req.files;
        }
        if(productImage != ""){
            for(i=0; i< productImage.length; i++){
                productImage[i].path = "https://www.phoolvala.com/product_images/"+productImage[i].filename
            }
        // if(productImage != ""){
            // let imgArray = [];
            // for(i = 0; i<data.productImage.length; i++){
            //     let buff = new Buffer.from(data.productImage[i].path, 'base64');
            //     let fileName = Date.now()+i+'.png'
            //     let filePath = "public/product_images/"+ fileName
            //     fs.writeFileSync(filePath, buff);
            //     let dbFilePath = URL+'/product_images/'+fileName
            //     imgArray.push({path:dbFilePath.toString()})
            // }
        	let data = await Product.findOneAndUpdate({_id:req.body.productId},{ 
                                          productName			: req.body.productName,
                                          price					: req.body.price,
                                          Category   			: req.body.Category,
                                          productDescription	: req.body.productDescription,
                                          productQuntity    	: req.body.productQuntity,
                                          productImage 			: productImage,
                                          status                : req.body.status,
                                          categoryId            : req.body.categoryId,
                                          merchantId            : req.body.merchantId,
                                          productWeight         : req.body.productWeight                         	                                         
                                          } );
        if(data != ""){
        return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
            // return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
        // return res.status(200).json({status:0, message:'Data Not Found',data:{}})
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
        return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
            // return res.status(200).json({status:1, message:'Product Updated Succesfully',data:data})
        }
        return res.redirect('/categorys/getAllCategory',{title: "All Category", isAuth : req.session.isLoggedIn})
        // return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }
        
    }catch(error){
        console.log(error)
    }
};

// exports.getProductByMerchant = async (req, res, next) => {
//     try{
//             let data = await Product.find({merchantId:req.body.merchantId, is_deleted:0})
//             if(data != "") {
//                 return res.status(200).json({status: 1, message: 'Product Details fetched success!', data: data})
//             }
//             return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
//         }
//         catch(error){
//             console.log(error)
//             return res.status(200).json({status: 0, message: 'try again later!'})
//         }
// };