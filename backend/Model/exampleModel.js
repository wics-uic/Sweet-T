import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:false
    },
    productId: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    }
}, {
    // mongoose auto adds an '_id', which will be cartId
    // timestamps: true
})

export default mongoose.model("Cart", cartSchema, "Cart");