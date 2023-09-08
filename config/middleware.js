const jwt  = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config");
module.exports=(req,res,next)=>{
    try{
        var token = req.headers.token
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded)
        req.userData = decoded
        next();

    }catch(error){
        if(error){
            res.status(200).json({
                Auth : "Failed",
                message:"Please check your Token",
                status:400
            })
        }
    }
}

