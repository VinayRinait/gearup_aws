const Dashboard = require("../models/dashboardModel");
const Product = require("../models/productModel.js");
const fs = require("fs")
const {URL} = require('../config/config')

exports.getAllDashboardData = async(req,res) => {
    try{
        let getData = await Dashboard.find()
        if(getData != ""){
        	return res.status(200).json({status:1, message:'Users data',data:getData})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    	
    }catch(error){
        console.log(error)
    }
}

exports.getAllDashboardDataForUser = async(req,res) => {
    try{
        // let resArray = {}
        let getData = await Dashboard.find()
        // resArray.bannerImage = getData[0].bannerImage
        // if(req.body.todayDeal == 1){
        //     resArray.todayDeal = getData[0].todayDeal
        // }
        // if(req.body.weekDeal == 2){
        //     resArray.weekDeal = getData[0].weekDeal
        // }
        // if(req.body.monthDeal == 3){
        //     resArray.monthDeal = getData[0].monthDeal
        // }
        // if(req.body.bestCategory == 4){
        //     resArray.bestCategory = getData[0].bestCategory
        // }
        if(getData != ""){
        	return res.status(200).json({status:1, message:'Users data',data:getData})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    	
    }catch(error){
        console.log(error)
    }
}

exports.addBanner = async (req, res) => {
    try {
        let bannerImages = req.body.bannerImage;
        let data = await Dashboard.findOne({});

        if (!data) {
            // Create a new "Dashboard" document if none is found
            data = new Dashboard();
        }

        for (let i = 0; i < bannerImages.length; i++) {
            let buff = new Buffer.from(bannerImages[i].path, 'base64');
            let fileName = Date.now() + i + '.png';
            let filePath = "public/banner_images/" + i + fileName;
            fs.writeFileSync(filePath, buff);
            let dbFilePath = URL + '/banner_images/' + fileName;
            data.bannerImage.push({ path: dbFilePath.toString() });
        }

        let saveImg = await data.save();
        if (saveImg !== null) {
            return res.status(200).json({ status: 1, message: 'Banner Images Uploaded Successfully', data: data });
        } else {
            return res.status(401).json({ code: 200, status: 0, message: 'Try Again', data: {} });
        }
    } catch (error) {
        console.log(error);
        // Handle the error appropriately
        return res.status(500).json({ status: 0, message: 'Internal Server Error', data: {} });
    }
};

exports.deleteBanner = async(req,res) => {
    try{
        let bannerPath = req.body.bannerPath
        const data = await Dashboard.findOne({})
        
        if(data.bannerImage!=""){
            data.bannerImage.forEach((obj)=>{
                console.log(obj.path)
                if(obj.path == bannerPath){
                    fs.unlinkSync("/public/banner_images/"+obj.filename)
                }
            })
        }
        for(var i in data.bannerImage){
            if(data.bannerImage[i].path== bannerPath){
                data.bannerImage.splice(i,1);
                break;
            }
        }
        let deleteImg = await data.save()
        if(deleteImg != ""){
        	return res.status(200).json({status:1, message:'Banner Images deleted Succesfully'})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.addTodayDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.todayDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'done',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteTodayDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.todayDeal){
            if(data.todayDeal[i]== productId.toString()){
                data.todayDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'done',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addWeekDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.weekDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'Week deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteWeekDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.weekDeal){
            if(data.weekDeal[i]== productId.toString()){
                data.weekDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addMonthDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        const data = await Dashboard.findOne({})
        data.monthDeal.push(productId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'month deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteMonthDeal = async(req,res) => {
    try{
        let productId = req.body.productId;
        let data = await Dashboard.findOne({})
        for(var i in data.monthDeal){
            if(data.monthDeal[i]== productId.toString()){
                data.monthDeal.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.addBestCategory = async(req,res) => {
    try{
        let categoryId = req.body.categoryId;
        const data = await Dashboard.findOne({})
        data.bestCategory.push(categoryId)
        let dataSave = await data.save()
        if(dataSave != ""){
        	return res.status(200).json({status:1, message:'month deal added Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
};

exports.deleteBestCategory = async(req,res) => {
    try{
        let categoryId = req.body.categoryId;
        let data = await Dashboard.findOne({})
        for(var i in data.bestCategory){
            if(data.bestCategory[i]== categoryId.toString()){
                data.bestCategory.splice(i,1);
                break;
            }
        }
        let saveData = await data.save()
        if(saveData != ""){
        	return res.status(200).json({status:1, message:'Week deal deleted Succesfully',data:data})
        }else{
        	return res.status(401).json({ code:200,status:0,message : "Try Again ",data : {} })
        }
    }catch(error){
        console.log(error)
    }
}

exports.getPackages = async(req, res) => {
    try{
        let getPackages = await Product.find({categoryId: "642e88afd1c59e38142eeb69"}).populate('merchantId',['merchantName', 'city', 'state', 'address'])
        if(getPackages){
            return res.status(200).json({status:0, message:"Packages Found Successfully", data:getPackages})
        }else{
            return res.status(200).json({status:0, message:"No Packages Found!"})
        }
    }catch(error){
        console.log(error)
    }
}