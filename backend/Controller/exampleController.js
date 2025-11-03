// This is am empty file

import Cart from "./model/exampleModel.js";

/*
POST API: add item to the cart 
If cart doesn't exists, create a new cart 
Increase quantity of product

Note: frontend must send an API request 

POSTing the data into the dataset 
*/
export const addItemToCart = async(req, res)=>{
    try {
        // request Cart model 
        const cartData = new Cart(req.body);
        // extract productId and quantity from cartData    
        const {productId, quantity} = cartData;

        // find if productId already exists in the cart
        const productInCart = await Cart.findOne({productId});
        if (productInCart) {
            return res.status(400).json({message: "product already in the cart."});
        }

        // if product doesn't exist, add to cart database 
        const savedProduct = await cartData.save();
        res.status(200).json(savedProduct);

        // // validate necessary product information is given 
        // if (!product ||!product.quantity) {
        //     return res.status(400).json({ error: "Missing product information" });
        // }

        // let cart = await Cart.findById(cartId);
        
        // if (cart) {
        //     // found cart 
        //     const itemIndex = cart.products.findIndex(p => p.productId == product.productId)
            
        //     if (itemIndex > -1) {
        //         cart.products[itemIndex].quantity += product.quantity
        //     } else {
        //         cart.products.push(product)
        //     }
        //     const updatedCart = await cart.save();
        //     return res.status(200).json(updatedCart);

        // } else {
        //     // create new cart 
        //     const newCart = await Cart.create({
        //         products: [product]
        //     });
        //     return res.status(201).json(newCart);
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."})
    }

}

export const fetch = async(req,res)=>{
    try{
        const products = await Cart.find({});
        if (products.length === 0) {
            res.status(400).json({message: "product not found"});
        }
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error: "Internal Server error."})
    }
}
/*
PUT API: add/update item in the cart 

Note: frontend must send an API request 
*/
export const update = async(req, res)=>{
    try {
        const id = req.params.id;
        const {quantity} = req.body;
        const quantityToAdd = parseInt(quantity, 10);

        if (quantity === undefined) {
            return res.status(400).json({message: "missing 'quantity' in request body"});
        }

        const updateCart = await Cart.findByIdAndUpdate(id, { $inc: {quantity: quantityToAdd }}, {new: true});
        
        if (!updateCart) {
            return res.status(404).json({message: "Product not in cart"});
        }
        res.status(201).json(updateCart);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}

/**
 * DELETE API: delete product in cart given its productId
 */
export const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;

        const productInCart = await Cart.findOne({_id: id});
        
        if (!productInCart) {
            return res.status(400).json({ message: "Product in cart not found"});
        }

        const deletedProduct = await Card.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Cart deleted successfully.", 
            productId: deletedProduct._id
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}