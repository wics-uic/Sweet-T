import mongoose from "mongoose";

<<<<<<< HEAD
const exampleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {
    collection: 'Examples'
});

export const Example = mongoose.model('Example', exampleSchema);
=======
const cartSchema = new mongoose.Schema({
    userId: {
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        // ref:"User",
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
>>>>>>> 93a148734965f142839ee9ea3faa536fdc431d48
