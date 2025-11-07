// This is am empty file

import Cart from "../Model/exampleModel.js";

/*
POST API: add product to the cart everytime use presses "add to bag" button
If cart doesn't exists, create a new cart 
*/
export const addProductToCart = async(req, res)=>{
    try {
        // console.log("Decoded user:", req.user);// implemented later 
        // const userId = req.user.userId;// for user session ID (userId = verifyToken)

        const { userId,name, quantity, customizations } = req.body;

        // 1. Check if cart exists 
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // 2. Create new Cart 
            cart = new Cart({
                userId, 
                products: [{ name, quantity, customizations }]
            });
        } else {
            // 3. Check if product already exists 
            const existingProduct = cart.products.find(p => p.name === name && p.customizations === customizations);

            if (existingProduct) {
                // 4. Update quantity
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({name, quantity, customizations});
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."})
    }

}

/*
GET API: fetch the JSON for the entire Cart (carts) 
*/ 
export const fetch = async(req,res)=>{
    try{
        const cart = await Cart.find({});
        if (cart.length === 0) {
            res.status(400).json({message: "product not found"});
        }
        res.status(200).json(cart);
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
        const { userId, products } = req.body;

        
        const id = req.params.id;

        const productInCart = await Cart.findOne({_id: id});
        
        if (!productInCart) {
            return res.status(400).json({ message: "Product in cart not found"});
        }

        const deletedProduct = await Cart.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Product deleted successfully.", 
            productId: deletedProduct._id
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}

/**
 * DELETE API: delete cart based off of userId or _id 
 */
export const deleteCart = async(req, res) => {
    try {
        const { userId } = req.body; 
        const id = req.body._id;

        if (!userId) {
            return res.status(400).json({error: "userId is required"});
        }
        
        const deletedCart = await Cart.findOneAndDelete({userId}); // can change to id as well

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

    res.status(200).json({ message: "Cart deleted successfully", cart: deletedCart });
  
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}