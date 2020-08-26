const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema
//for a single product
const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const ProductCart = mongoose.model("ProductCart",productCartSchema)
// collection of all ordered product
const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    status: {
        type:String,
        default: "Received",
        enum: ["canceled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps: true})

const Order = mongoose.model("Order",orderSchema)

module.exports = {Order,ProductCart}

