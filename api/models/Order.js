const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId:{type:String,required:true},
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String
            },
            size:{
                type:String
            },
            color:{
                type:String
            },
            quantity: {
                type: Number,
                default:1
            },
            img:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);