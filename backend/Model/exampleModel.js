import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:false
    },
    productId: {
        type:String,
        requred:true
    },
    quantity: {
        type:Number,
        required:true
    }
}, {
    // mongoose auto adds an '_id', which will be cartId
    // timestamps: true
})

export default mongoose.model("cart", cartSchema);