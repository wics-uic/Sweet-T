import mongoose from "mongoose";

const sweetCategoriesSchema = new mongoose.Schema({
    name: {  // Name of this product.
        type:String,
        required: true
    },
    product_type: {  // Description of this sweet category.
        type:String,
        required: true
    },
    price_representation: {  // Representation of the price.
        type:String,
        required: true
    },
    image_url: {  // Stores image url.
        type:String,
        required: true
    },
})

export default mongoose.model("sweetCategories", sweetCategoriesSchema);