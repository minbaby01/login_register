const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String
}, {
    timestamps: true
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel