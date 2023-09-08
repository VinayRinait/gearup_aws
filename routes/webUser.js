var express = require("express");
var  router = express.Router();
var webUserController = require("../controllers/webUserController")

router.get("/login", webUserController.getLogin)
router.post("/login", webUserController.login)
router.get("/register", webUserController.getRegister) 
router.post("/register", webUserController.register) 



module.exports = router ;