const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
    bannerImage : Array,
    todayDeal : {type : [ mongoose.Schema.Types.ObjectId], ref:'product'},
    weekDeal : {type : [ mongoose.Schema.Types.ObjectId], ref:'product'},
    monthDeal : {type : [ mongoose.Schema.Types.ObjectId], ref:'product'},
    bestCategory : {type : [ mongoose.Schema.Types.ObjectId], ref:'Category'}
},{
    timestamps: true
})

module.exports = mongoose.model('Dashboard', dashboardSchema);