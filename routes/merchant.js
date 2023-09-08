var express = require("express");
var  router = express.Router();
var merchantController = require("../controllers/merchantController")
const auth = require("../config/middleware.js")


// router.post("/login", merchantController.login)  

router.post("/merchantRegister", merchantController.merchantRegister) 
router.post("/getMerchant", merchantController.getMerchant)  
router.post("/getMerchantById", merchantController.getMerchantById) 
router.post("/deleteMerchant", merchantController.deleteMerchant) 
router.post("/updateMerchant", merchantController.updateMerchant)  
router.post("/getOrderByMerchant", merchantController.getOrderByMerchant)
router.post("/getMerchantPaymet", merchantController.getMerchantPaymet)

module.exports = router ;