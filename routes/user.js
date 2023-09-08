var express = require("express");
var  router = express.Router();
var userController = require("../controllers/userController")
const auth = require("../config/middleware.js")

router.post("/login", userController.login)

router.post("/register", userController.register) 
router.post("/getUser", userController.getUser)  
router.post("/getUserById", userController.getUserById) 
router.post("/deleteUser", userController.deleteUser) 
router.post("/updateUser", userController.updateUser)  
router.post("/userSubscribePackages", userController.userSubscribePackages)  

router.post("/forgetPassword", userController.forgetPassword)
router.post("/submitForgetPassword", userController.submitForgetPassword)

module.exports = router ;