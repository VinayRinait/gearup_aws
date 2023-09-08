var express = require("express");
var  router = express.Router();
var webProductController = require("../controllers/webProductController")
const upload = require('../utils/productUpload');
const auth = require("../config/middleware.js")

 
router.get("/getProductByCategory/:categoryId", webProductController.getProductByCategory)
router.get("/getAddProduct", webProductController.getAddProduct)

router.post("/addProduct", webProductController.addProduct)
router.get("/getProductById/:productId", webProductController.getProductById)
router.get("/deleteProduct/:productId", webProductController.deleteProduct)
router.get("/getUpdateProduct/:productId", webProductController.getUpdateProduct)
router.post("/updateProduct", webProductController.updateProduct)


module.exports = router ;