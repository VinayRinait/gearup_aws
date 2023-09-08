var mongoose = require("mongoose");    
var categorySchema = new mongoose.Schema({
    categoryName 		 : {type : String , default : ''},
    status               : {type: String},
    categoryImage     	 : Array,
    is_deleted           :{type:String,default:0}           
},{
    timestamps: true
})


module.exports = mongoose.model("Category" , categorySchema)