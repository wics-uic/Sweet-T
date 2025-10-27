
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
        type: new mongoose.Schema({
            quantities: {
                type: [String],
                required: true
            },
            flavors: {
                type: [String],
                required: true
            }
        }),
        required: true
    },
    Custom_Option:{
        type: new mongoose.Schema({
            quantities: {
                type: [String],
                required: true
            },
            flavors: {
                type: [String],
                required: true
            },
            color: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }),
        required: true
    }
})

export default mongoose.model("ProductDetail", productDetailsSchema);