import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
    },
    images: {
        type: Array,
        requierd: true,
        default: []
    },
    brand: {
        type: String,
        requierd: true,
    },
    category: {
        type: String,
        requierd: true,
    },
    reviews: {
        type: Array,
        requierd: true,
        default: [],
    },
    rating: {
        type: Number,
        requierd: true,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        requierd: true,
    },
    price: {
        type: Number,
        requierd: true,
    },
    stock: {
        type: Number,
        requierd: true,
    },
    productsIsNew: {
        type: Boolean,
        requierd: true,
    },
    stripeId: {
        type: String,
    },
} , {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;