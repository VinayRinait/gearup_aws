const Category = require("../models/categoryModel.js");
var mongoose = require("mongoose");
const fs = require("fs");
const {URL} = require('../config/config')

exports.addCategory = async (req, res, next) => {
    try {
        let data = { ...req.body };
        let imgArray = [];

        for (let i = 0; i < data.categoryImage.length; i++) {
            try {
                let buff = new Buffer.from(data.categoryImage[i].path, 'base64');
                let fileName = Date.now() + i + '.png';
                let filePath = "public/category_images/" + fileName;

                // Create the directory if it doesn't exist
                fs.mkdirSync("public/category_images", { recursive: true });

                // Write the file
                fs.writeFileSync(filePath, buff);

                let dbFilePath = URL + '/category_images/' + fileName;
                imgArray.push({ path: dbFilePath.toString() });
            } catch (error) {
                console.error("Error while creating and writing the file:", error);
            }
        }

        let reg = await Category.create({
            categoryName: data.categoryName,
            categoryImage: imgArray
        });

        if (reg != "") {
            return res.status(200).json({ status: 1, message: 'Category Submitted Successfully', data: reg });
        } else {
            return res.status(401).json({ code: 200, status: 0, message: "Try Again", data: {} });
        }

    } catch (error) {
        console.error(error);
        // Handle other errors or send an appropriate response
        return res.status(500).json({ status: 0, message: 'Internal Server Error', data: {} });
    }
};
exports.getCategory = async (req, res, next) => {
    try{
            let category = await Category.find({is_deleted: 0})
            if(category != "") {
                return res.status(200).json({status: 1, message: 'Category Details fetched success!', data: category})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};


exports.getCategoryById = async (req, res, next) => {
    try{
            let category = await Category.find({_id: req.body.categoryId, is_deleted: 0})
            if(category != "") {
                return res.status(200).json({status: 1, message: 'Category Details fetched success!', data: category})
            }
            return res.status(200).json({status: 0, message: 'data Not Found!', data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.deleteCategory=async (req,res)=>{
     let  data = await Category.findOneAndUpdate({_id : req.body.categoryId,is_deleted:0 },{is_deleted:1});
     if(data){
            return res.status(200).json({status:1, message:"Category Deleted succesfully", data:{}}) 
     }else{
         return res.status(200).json({status:0, message:"Data Not Found", data:{}})
     }
}

exports.updateCategory = async (req, res, next) => {
    try{
        // let images = req.body.images;
        // if( req.files != undefined){
        //     console.log(":Test,=")
        //     categoryImage = req.files;
        // }
        // if(categoryImage != ""){
        //     for(i=0; i< categoryImage.length; i++){
        //         categoryImage[i].path = "https://www.phoolvala.com/category_images/"+categoryImage[i].filename
        //     }
        if(categoryImage != ""){
            let imgArray = [];
            for(i = 0; i< req.body.categoryImage.length; i++){
                let buff = new Buffer.from(req.body.categoryImage[i].path, 'base64');
                let fileName = Date.now()+i+'.png'
                let filePath = "public/category_images/"+ fileName
                fs.writeFileSync(filePath, buff);
                let dbFilePath = URL+'/category_images/'+fileName
                imgArray.push({path:dbFilePath.toString()})
            }
                    	let data = await Category.findOneAndUpdate({_id:req.body.categoryId},{ 
                                          categoryName 	: req.body.categoryName,
                                          status 		: req.body.status,
                                          categoryImage : imgArray                                    	                                         
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Category Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }else{
    	let data = await Category.findOneAndUpdate({_id:req.body.categoryId},{ 
                                                categoryName 	: req.body.categoryName,
                                                status 		    : req.body.status,                                       	
                                          } );
        if(data != ""){
            return res.status(200).json({status:1, message:'Category Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }
        
    }catch(error){
        console.log(error)
    }
};