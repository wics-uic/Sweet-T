import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [productSchema], // replace with the Product Model
}, {
    // mongoose auto adds an '_id', which will be cardId
    timestamps: true
})

const productSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {    
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
})

export default mongoose.model("cart", cartSchema);