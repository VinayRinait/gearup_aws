var mongoose = require("mongoose");    
var merchantSchema = new mongoose.Schema({
    merchantName 		 : {type : String , default : ''},
    email 			     : {type :String ,match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password             : {type :String},
    mobileNo             : {type: Number},
    otp                  : {type: Number , default: null},
    city                 : {type :String},
    state                : {type :String},
    address              : {type :String},
    role                 : {type: String, default: "Merchant"},
    status               : {type: Number, default: 0},
    is_deleted           : {type:Number,default:0}           
},{
    timestamps: true
})


module.exports = mongoose.model("Merchant" , merchantSchema)