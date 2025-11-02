

import ProductDetail from "../Model/productDetailsModel.js"


// Code for POSTing the data into the database
export const create = async(req, res)=>{
    try{
        const productData = new ProductDetail(req.body);
        const {name, size}= productData; // extract name and size from object

        const productExist = await ProductDetail.findOne({name, size})
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


//  //Code for DELETING a product by ID

// export const deleteProduct = async (req, res)=>{
//     try{

//         const id = req.params.id
//         // check if product exists in the db
//         const productExists = await ProductDetail.findOne({_id:id});
//         if (!productExists) {
//             return res.status(404).json({messge: "product not found"});
//         }
//         await ProductDetail.findByIdAndDelete(id);
//         return res.status(201).json({message: "Product deleted successfully"});
//     }
//     catch (error){
//         res.status(500).json({error:"Internal Server error."})
//     }
// }
    


// Code for UPDATING a product detail by ID
export const update = async (req, res)=>{
     try{
         const id = req.params.id
         // check if product exists in the db
         const productExists = await ProductDetail.findOne({_id:id});
         if (!productExists) {
             return res.status(404).json({messge: "product not found"});
         }
         const updateProduct = await ProductDetail.findByIdAndUpdate(id, req.body, {new:true});
         return res.status(201).json(updateProduct)
     }
     catch (error){
         res.status(500).json({error:"Internal Server error."})
     }
    };
    