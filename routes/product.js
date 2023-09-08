var express = require("express");
var  router = express.Router();
var productController = require("../controllers/productController")
const upload = require('../utils/productUpload');
const auth = require("../config/middleware.js")

router.post("/addProduct", productController.addProduct) 
router.get("/getProduct", productController.getProduct)  
router.post("/getProductById", productController.getProductById) 
router.post("/deleteProduct", productController.deleteProduct) 
router.post("/updateProduct", productController.updateProduct)  
router.post("/getProductByCategory", productController.getProductByCategory)
router.post("/getProductByMerchant", productController.getProductByMerchant)



module.exports = router ;