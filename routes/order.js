var express = require("express");
var  router = express.Router();
var orderController = require("../controllers/orderController")

router.post('/placeorder', orderController.placeOrder)
router.post('/getorder',orderController.getAllOrder)
router.post('/getOrderByUser',orderController.getOrderByUser)
router.post('/getOrderById',orderController.getOrderById)
router.post('/updateOrder',orderController.updateOrder)
router.post('/verifyPayment',orderController.verifyPayment)
router.post('/updateOrderDeliveryStatus',orderController.updateOrderDeliveryStatus)


module.exports = router;