const User = require("../models/userModel.js");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET , URL, USER_NAME, PASSWORD} = require("../config/config");
const axios = require('axios');
const nodemailer = require("nodemailer");


exports.login = async (req,res,next)=>{
  let Obj = {}
 let  user = await User.findOne({mobileNo : req.body.mobileNo})
 if(user){
      bcrypt.compare(req.body.password, user.password , function (err, result){
         if(result == true){
                            const token = jwt.sign({
                                    email:user.email,
                                    userId:user._id
                                },JWT_SECRET,
                                {
                                    expiresIn:"100h"
                            });
                            Obj.user = user;
                            Obj.token = token;
              return  res.status(200).json({ code:200,status:1,message : "Login succesfull",data : Obj })            
         }else{
            return  res.status(200).json({ code:200,status:0,message : "Wrong Password Please Check Your Password",data : {} })         
         }
      })
 }else{
     return res.status(200).json({ code:200,status:0, message: `The Mobile is not associated with any account. Double-check your Mobile and try again.`, data : {}});
 }
}

exports.register = async (req,res)=>{
    try{
        let Obj = {};
        let findUser = await User.findOne({mobileNo: req.body.mobileNo, email: req.body.email})
        if(findUser){
            return res.status(200).send({ code:200,status:0, message:"Email Or Mobile Number Already registerd",data:{} })  
        }
        let hash  = await bcrypt.hashSync(req.body.password,10);
        let user = await User.create({
            fullName            : req.body.fullName,
            email               : req.body.email,
            mobileNo            : req.body.mobileNo,
            password            : hash,
            role                : "user" ,
            city                : req.body.city,
            state               : req.body.state,
            address             : req.body.address            
        }) 
        if(user){
            let creareCart = await axios.post(URL+'/userCart/addToCart', {user_id:user._id})
            const token = jwt.sign({
                                    email:user.email,
                                    userId:user._id
                                },JWT_SECRET,
                                {
                                    expiresIn:"100h"
                            });
                            Obj.users = user;
                            Obj.token = token;
            res.status(200).json({ code:200,status:1,message : "User register succesfull",data : Obj })
        }else{
            res.status(401).json({ code:400,status:0,message : "Try Again ",data : {} })
        }     
    }  catch(error){
        console.log(error,"<====error")
    res.status(401).json({ code:400,status:0,message : "Getting Error while register"})
    }
}

exports.getUser = async (req, res, next) => {
    try{
            let user = await User.find({role: "user",is_deleted: 0}).select(['fullName','email','mobileNo','city', 'state', 'address','subscribePackage' ]).populate('subscribePackage.product_id')
            if(user) {
                return res.status(200).json({status: 1, message: 'User Details fetched success!', user: user})
            }
            return res.status(200).json({status: 1, message: 'data Not Found!', user: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.getUserById = async (req, res, next) => {
    try{
            let user = await User.find({role: "user",_id: req.body.userId, is_deleted: 0}).select(['fullName','email','mobileNo','city', 'state', 'address', 'subscribePackage' ]).populate('subscribePackage.product_id')
            if(user) {
                return res.status(200).json({status: 1, message: 'User Details fetched success!', user: user})
            }
            return res.status(200).json({status: 1, message: 'data Not Found!', user: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};

exports.deleteUser=async (req,res)=>{
     let  data = await User.findOneAndUpdate({role: "user",_id : req.body.userId,is_deleted:0 },{is_deleted:1});
     if(data){
            return res.status(200).json({status:1, message:"User Deleted succesfully", data:data}) 
     }else{
         return res.status(200).json({status:0, message:"Data Not Found", data:data})
     }
}

exports.updateUser = async (req, res, next) => {
    try{
        let data = await User.findByIdAndUpdate({role: "user", _id:req.body.userId},{ 
                                                fullName            : req.body.fullName,
                                                email               : req.body.email,
                                                mobileNo            : req.body.mobileNo,
                                                city                : req.body.city,
                                                state               : req.body.state,
                                                address             : req.body.address   
                                          } ,{new:true});
        if(data){
            return res.status(200).json({status:1, message:'User Updated Succesfully',data:data})
        }
        return res.status(200).json({status:0, message:'Data Not Found',data:{}})
    }catch(error){
        console.log(error)
    }
};

exports.forgetPassword = async (req, res, next) => {
    try{
        let generateOtp = await generateOTP()
        let findEmail = await User.find({email : req.body.email,is_deleted:0})
        console.log(findEmail,"<=======findEmail")
        if(!findEmail){
            return res.status(200).json({status:0, message:'Wrong mail Id',data:{}})
        }
        var mailOptions = {
            from: '"Bloomb" <accounts@bloomb.in>',
            to: req.body.email,
            subject: "Verification OTP For Bloomb",
            html : "<p>Hi </br>Your Verification OTP is: <h3>"+ generateOtp +"</h3></br></br> Thank You </p>"
          };

          transporter.sendMail(mailOptions, async function (err, info) {
            if (err) {
              console.log(err);
              return ('Error while sending email' + err)
            }
            else {
              console.log("Email sent");
            let data = await User.findOne({email : req.body.email,is_deleted:0})
            data.otp = generateOtp
            let saveData = await data.save()
            if(saveData){
                return res.status(200).json({status:1, message:'otp Save Succesfully',data:{}})
            }
            return res.status(200).json({status:0, message:'Data Not Found',data:{}})
            }
          });
    }catch(error){
        console.log(error)
    }
};


exports.submitForgetPassword = async (req, res, next) => {
    try{
         let hash  = await bcrypt.hashSync(req.body.password,10);
        let data = await User.findOne({otp:req.body.otp,email:req.body.email});
        data.password = hash
        data.otp = null
        let saveData = await data.save()
        if(saveData){
            return res.status(200).json({status:1, message:'Password Updated Succesfully',data:{}})
        }
        return res.status(200).json({status:0, message:'Wrong Otp',data:{}})
    }catch(error){
        console.log(error)
    }
};

exports.userSubscribePackages = async(req, res) =>{
    try{
        let updateSub = await User.findByIdAndUpdate({_id: req.body.user_id},{
            subscribePackage: req.body.subscribePackage
        },{new:true})
        if(updateSub){
            return res.status(200).json({status:1, message:'Package Subscrible Succesfully',data:updateSub})
        }else{
            return res.status(200).json({status:1, message:'Somthing Went Wrong Please Try Again Later',data:{}})
        }
    }catch(error){
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

  var transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: USER_NAME, // your domain email address
      pass: PASSWORD // your password
    }
  });