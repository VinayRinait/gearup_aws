const express = require('express');
const router = express.Router();
deliveryPersonController = require('../controllers/deliveryPersonController');

router.post("/register", deliveryPersonController.deliveryPersonRegister) 
router.post("/getdeliveryPerson", deliveryPersonController.getDeliveryPerson)  
router.post("/getDeliveryPersonById", deliveryPersonController.getDeliveryPersonById) 
router.post("/deleteDeliveryPerson", deliveryPersonController.deleteDeliveryPerson) 
router.post("/updateDeliveryPerson", deliveryPersonController.updateDeliveryPerson)  
router.post("/forgetPassword", deliveryPersonController.forgetPassword)
router.post("/submitForgetPassword", deliveryPersonController.submitForgetPassword)
router.post("/getAllDeliveryPersonOrder", deliveryPersonController.getAllDeliveryPersonOrder)
router.post("/getAllActiveDeliveryPerson", deliveryPersonController.getAllActiveDeliveryPerson)

module.exports = router ;