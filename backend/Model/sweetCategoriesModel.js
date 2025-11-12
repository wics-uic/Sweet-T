import mongoose from "mongoose";

const sweetCategoriesSchema = new mongoose.Schema({
    image_url: {  // Stores image url.
        type:String,
        required: true
    },
    description: {  // Description of this sweet category.
        type:String,
        required: true
    },
    product_type: {  // Description of this sweet category.
        type:String,
        required: true
    },
    average_price:{
        type:Number,
        required: true
    }
})

export default mongoose.model("sweetCategories", sweetCategoriesSchema);