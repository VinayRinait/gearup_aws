var express = require("express");
const isAuth = require('../config/isAuth')
var  router = express.Router();
var webCategoryController = require("../controllers/webCategoryController")



router.get("/", webCategoryController.getAllCategory)   


module.exports = router ;