import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    products: [{
        // Method 1: Normalized data 
        // _id 
        name: {
            type:String,
            required:true
        },
        quantity: {
            type:Number,
            default:0
        },
        customizations: {
            type:String,
            required:false
        },
        price: {
            type:Number,
            required:true,
            default:0
        }
        // Method 2: denormalized 
        // name: String,
        // price: Number,
        // quantity: {
        //     type: Number,
        //     default: 0
        // }
    }],
    promoCodes: {
        type:String,
        required:false
    },
 
});

export default mongoose.model("Cart", cartSchema, "Cart"); // carts
