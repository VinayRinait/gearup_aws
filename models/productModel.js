var mongoose = require("mongoose");    
var productSchema = new mongoose.Schema({
   
    productName          	 : {type :String},
    price               	 : {type: Number},
    categoryId          	 : {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    productDescription		 : {type :String},
    
    productImage			 : Array,
    status                   : {type: Number, default:0},
    is_deleted           	 : {type:String,default:0}           
},{
    timestamps: true
})

module.exports = mongoose.model("product" , productSchema)  