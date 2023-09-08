var express = require("express");
var  router = express.Router();
var useracrtController = require("../controllers/userCartController")
const auth = require("../config/middleware.js")

router.post("/addToCart", useracrtController.addToCart) 
router.post("/removeProductFromCart", useracrtController.removeProductFromCart)  
router.post("/getUserCart", useracrtController.getUserCart)

module.exports = router ;