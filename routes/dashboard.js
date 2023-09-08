const express = require('express');
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const upload = require('../utils/bannerUpload');

router.post("/getalldashboard",dashboardController.getAllDashboardData)
router.post("/getalldashboardforuser",dashboardController.getAllDashboardDataForUser)
router.post("/addbanner",upload('bannerImage'),dashboardController.addBanner)
router.post("/deletebanner",dashboardController.deleteBanner)
router.post("/addtodaydeal",dashboardController.addTodayDeal)
router.post("/deletetodaydeal",dashboardController.deleteTodayDeal)
router.post("/addweekdeal",dashboardController.addWeekDeal)
router.post("/deleteweekdeal",dashboardController.deleteWeekDeal)
router.post("/addmonthdeal",dashboardController.addMonthDeal)
router.post("/deletemonthdeal",dashboardController.deleteMonthDeal)
router.post("/addbestcategory",dashboardController.addBestCategory)
router.post("/deletebestcategory",dashboardController.deleteBestCategory)
router.post("/getPackages",dashboardController.getPackages)


module.exports = router;