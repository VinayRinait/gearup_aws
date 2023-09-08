const User = require("../models/userModel.js");
var bcrypt = require('bcryptjs');

exports.getLogin = async (req, res)=> {
    res.render('login',{
        title: 'Login', 
        isAuth: req.session.isLoggedIn, 
        // path: '/',
    })
};

exports.getRegister = async (req, res)=> {
    res.render('signup',{
        title: 'SignUp', 
        isAuth: req.session.isLoggedIn, 
        // path: '/',
    })
};

exports.login = async (req, res)=> {
    let Obj = {}
    let  user = await User.findOne({mobileNo : req.body.mobileNo})
    if(user){
         bcrypt.compare(req.body.password, user.password , function (err, result){
            if(result == true){
                req.session.isLoggedIn = true;
                req.session.user = user; 
                return req.session.save(err => {
                    res.redirect('/');
                })
            }else{
               return  res.redirect('/webUser/login')         
            }
         })
    }else{
        return res.redirect('/register')
    }
};

exports.register = async (req, res)=> {
    try{
        let Obj = {};
        let findUser = await User.findOne({mobileNo: req.body.mobileNo})
        if(findUser){
            return res.redirect('/webUser/login')  
        }
        let hash  = await bcrypt.hashSync(req.body.password,10);
        let user = await User.create({
            fullName            : req.body.fullName,
            email               : req.body.email,
            mobileNo            : req.body.mobileNo,
            password            : hash,
            role                : "user"             
        }) 
        if(user){
            return res.redirect('/webUser/login')
        }else{
            return res.redirect('/register')
        }     
    }  catch(error){
        console.log(error,"<====error")
    res.status(401).json({ code:400,status:0,message : "Getting Error while register"})
    }
};