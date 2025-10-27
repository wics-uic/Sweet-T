
import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    Ready_Made_Options:{
        type:Object,
        required: true
    },
    Custom_Option:{
        type:Object,
        required: true
    }
})

export default mongoose.model("Product Details", productDetailsSchema);