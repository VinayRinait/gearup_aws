const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
    products            :       [{
        product_id      :       {type : mongoose.Schema.Types.ObjectId, ref:'product'},
        price           :       {type : Number},
        quantity        :       {type : Number},
    }],
    user_id             :       {type : mongoose.Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('userCart', userCartSchema);