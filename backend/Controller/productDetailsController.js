

import ProductDetail from "../Model/productDetailsModel.js"


// Code for POSTing the data into the database
export const create = async(req, res)=>{
    try{
        const productData = new ProductDetail(req.body);
        const {product_name, type}= productData; // extract name and size from object

        const productExist = await ProductDetail.findOne({product_name, type})
        if (productExist){
            return res.status(400).json({message: "Product Detail already exists."})
        }

        // If user doesn't already exist then save user
        const savedProduct = await productData.save();
        res.status(200).json(savedProduct);

    }catch(error){
        res.status(500).json({error:"Internal Server error."})
    }
    }

// Code for GETting all the data from the database

export const fetch = async (req, res)=>{
    try{
        const products = await ProductDetail.find({});
        // if there are no products:
        if (products.length === 0) {
            return res.status(404).json({messge: "product not found"});
        }
        return res.status(200).json(products)

    }catch (error){
        res.status(500).json({error:"Internal Server error."})
    }
}


// Code for UPDATING a product detail by product name
export const update = async (req, res)=>{
     try{
         const {name} = req.params
         // check if product exists in the db
         const productExists = await ProductDetail.findOne({product_name: name});
         if (!productExists) {
             return res.status(404).json({messge: "product not found"});
         }
         const updateProduct = await ProductDetail.findOneAndUpdate({product_name: name}, req.body, {new:true});
         return res.status(201).json(updateProduct)
     }
     catch (error){
         res.status(500).json({error:"Internal Server error."})
     }
    };




//Code for DELETING a product by product name
export const deleteProduct = async (req, res)=>{
    try{
        const {name} = req.params
        // check if product exists in the db
        const productExists = await ProductDetail.findOne({product_name: name});
         if (!productExists) {
             return res.status(404).json({messge: "product not found"});
         }
        await ProductDetail.findOneAndDelete({product_name: name});
        return res.status(201).json({message: "Product deleted successfully"});
    }
    catch (error){
        res.status(500).json({error:"Internal Server error."})
    }
}
    