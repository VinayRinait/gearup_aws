const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id            :       {type : String, default: null},
    transction_id       :       {type : String, default: null},
    products            :       [{
        product_id      :       {type : mongoose.Schema.Types.ObjectId, ref:'product'},
        price           :       {type : Number},
        quantity        :       {type : Number},
    }],
    user_id             :       {type : mongoose.Schema.Types.ObjectId, ref:'User'},
    total_amount        :       {type : Number},
    payment_method      :       {type : String},
    payment_status      :       {type : Number, default : 0}, //0 pending, 1 = success, 2 = fail
    deliveryStatus      :       {type : Number, default: 0},  // 0 = pending , 1= deliveryed
    receiptId           :       {type : String},
    delivery_person_id  :       {type : mongoose.Schema.Types.ObjectId, default:null, ref:'User'},
    merchant_id         :       {type : mongoose.Schema.Types.ObjectId, default:null, ref:'User'}
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Order', orderSchema);