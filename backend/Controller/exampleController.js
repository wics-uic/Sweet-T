// This is am empty file

import Cart from "../Model/exampleModel.js";

/*
POST API: Add product to the User's cart 
*/
export const addProductToCart = async(req, res)=>{
    try {
        const userId = req.userId; // assuming userId is set in req by authentication middleware
        const { name, quantity, customizations, price } = req.body;

        console.log("Debug - UserID:", userId); // Add this to check if it prints!
        console.log("Debug - Body:", req.body);

        // 1. Check if cart exists 
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // 2. Create new Cart 
            cart = new Cart({
                userId, 
                products: [{ name, quantity, customizations, price }]
            });
        } else {
            // 3. Check if product already exists 
            const existingProduct = cart.products.find(p => p.name === name && p.customizations === customizations);

            if (existingProduct) {
                // 4. Update quantity
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({name, quantity, customizations, price});
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
GET API: Fetch the specific User's Cart 
*/ 
export const fetchUserCart = async(req,res)=>{
    try{
        const userId = req.userId;
        
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(200).json({ products: []});
        }
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({error: "Internal Server error."})
    }
}


/**
 * DELETE API: Delete a specific product from the User's cart 
 */
export const deleteProduct = async(req, res) => {
    try {
        const userId = req.userId;
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
 * DELETE API: Clear the entire cart for the current user 
 */
export const clearCart = async(req, res) => {
    try {
        const userId = req.userId;

        // Delete the cart that matches the cookie ID (userId)
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
