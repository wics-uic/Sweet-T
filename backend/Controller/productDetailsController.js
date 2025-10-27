

import Product from "../Model/productDetailsModel.js"

// Past example here:
// // Code for POSTing the data into the database
// export const create = async(req, res)=>{
//     try{
//         const productData = new Product(req.body);
//         const {name, size}= productData; // extract name and size from object

//         const productExist = await Product.findOne({name, size})
//         if (productExist){
//             return res.status(400).json({message: "Product already exists."})
//         }

//         // If user doesn't already exist then save user
//         const savedProduct = await productData.save();
//         res.status(200).json(savedProduct);

//     }catch(error){
//         res.status(500).json({error:"Internal Server error."})
//     }
// }