// This is am empty file

import Cart from "../model/exampleModel.js";

/*
POST API: add item to the cart 
If cart doesn't exists, create a new cart 
Increase quantity of product

Note: frontend must send an API request 
*/
export const addItemToCart = async(req, res)=>{
    try {
        // grab Product from frontend/Button 
        const { product, cartId } = req.body; 

        // validate necessary product information is given 
        if (!product ||!product.quantity) {
            return res.status(400).json({ error: "Missing product information" });
        }

        let cart = await Cart.findById(cartId);
        
        if (cart) {
            // found cart 
            const itemIndex = cart.products.findIndex(p => p.productId == product.productId)
            
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += product.quantity
            } else {
                cart.products.push(product)
            }
            const updatedCart = await cart.save();
            return res.status(200).json(updatedCart);

        } else {
            // create new cart 
            const newCart = await Cart.create({
                products: [product]
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."})
    }

}

/*
PUT API: add item to the cart 
If cart doesn't exists, create a new cart 
Increase quantity of product

Note: frontend must send an API request 
*/
export const updateItemQuantity = async(req, res)=>{
    try {
        const { cartId, productId, quantity } = req.body;
        // validate necessary product information is given 
        if (!cartId || !productId ||quantity == null) {
            return res.status(400).json({ error: "Missing required information" });
        }
        
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be 1 or more."});
        }

        if (!cart) {
            return res.status(404).json({ message: "Cart not found."});
        }

        const itemIndex = cart.products.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            // Product found
            cart.products[itemIndex].quantity = quantity;
            const updatedCart = await cart.save();
            return res.status(200).json(updatedCart);
        } else {
            // Product not found (should've been taken care of in AddItemToCart)
            return res.status(404).json({ message: "Product not found in cart."});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}

/**
 * DELETE API: delete entire cart if given cartId 
 */
export const deleteCart = async(req, res) => {
    try {
        const {cartId } = req.params;

        if (!cardId) {
            return res.status(400).json({ message: "missing cardId in the URL"});
        }

        const deletedCart = await Card.findByIdAndDelete(cartId);
        return res.status(200).json({
            message: "Cart deleted successfully.", 
            cartId: deletedCart._id
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error."});
    }
}