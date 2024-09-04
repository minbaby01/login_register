const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    images: [String],
    size: [String],
    colors: [String],
    description: String
}, {
    timestamps: true
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel