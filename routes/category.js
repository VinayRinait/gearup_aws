var express = require("express");
var  router = express.Router();
var categoryController = require("../controllers/categoryController")
const upload = require('../utils/categoryUpload');
const auth = require("../config/middleware.js")


router.post("/addCategory", categoryController.addCategory) 
router.post("/getCategory", categoryController.getCategory)  
router.post("/getCategoryById", categoryController.getCategoryById) 
router.post("/deleteCategory", categoryController.deleteCategory) 
router.post("/updateCategory", categoryController.updateCategory)  


module.exports = router ;