const mongoose = require('mongoose');

const assignorderSchema = new mongoose.Schema({
    order_id            :       {type : mongoose.Schema.Types.ObjectId, ref:'Order'},
    deliveryPersonId    :       {type : mongoose.Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Assignorder', assignorderSchema);