var mongoose = require("mongoose");    
var userSchema = new mongoose.Schema({
    fullName 		     : {type : String , default : ''},
    merchantName 		 : {type : String , default : ''},
    email 			     : {type :String ,match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password             : {type :String},
    mobileNo             : {type: Number},
    otp                  : {type: Number , default: null},
    city                 : {type :String},
    state                : {type :String},
    address              : {type :String},
    role                 : {type: String, default: "user"},
    subscribePackage     : [{
        product_id        : {type : mongoose.Schema.Types.ObjectId, ref:'product'}
    }],
    status               : {type: Number, default: 0}, // 0 = active delivery person , 1= Inactive delivery person
    is_deleted           : {type:Number,default:0}       
},{
    timestamps: true
})


module.exports = mongoose.model("User" , userSchema)