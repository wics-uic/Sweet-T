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

/**
 * DELETE API: delete product in cart given its productId
 */
export const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({error: "productId not found in cart"});
        }

        // Find the cart that contains the productId
        const cart = await Cart.findOne({ "products._id": productId });

        if (!cart) {
            return res.status(400).json({message: "Cart containing product not found"});
        }
        // Remove product from products array 
        cart.products = cart.products.filter(p => p._id.toString() !== productId);

        await cart.save();

        res.status(200).json({message: "product removed from cart", cart});
        
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}

/**
 * DELETE API: delete cart based off of userId (user name)
 */
export const deleteCartByUserId = async(req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({error: "userId is required"});
        }
        
        const deletedCart = await Cart.findOneAndDelete({userId}); // deletes by userId value 

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

    res.status(200).json({ message: "Cart deleted successfully", cart: deletedCart });
  
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}

/**
 * DELETE API: delete cart based off of _id (session)
 * Note: The actual ID will not matter, because as long as its _id (for the session) 
 * it will update the "most recent?" cart
 */
export const deleteCart = async(req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({error: "userId is required"});
        }
        
        const deletedCart = await Cart.findOneAndDelete(id); // deletes by card _id 

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

    res.status(200).json({ message: "Cart deleted successfully", cart: deletedCart });
  
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}