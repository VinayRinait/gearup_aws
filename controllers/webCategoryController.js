const Category = require("../models/categoryModel.js");


exports.getAllCategory = async (req, res, next) => {
    try{
            let category = await Category.find({is_deleted: 0})
            if(category != "") {
                return res.render('categoryList',{title: 'All Category',data:category, isAuth: req.session.isLoggedIn, })
            }
            return res.render('categoryList',{title: 'All Category',data: {}})
        }
        catch(error){
            console.log(error)
            return res.status(200).json({status: 0, message: 'try again later!'})
        }
};