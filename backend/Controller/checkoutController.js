import { Orders } from "../Model/checkoutModel.js";

export const createOrder = async (req, res) => {
    try {
        console.log("Testing recieved", req.body);
        const {
            // ProductsOrdered,
            email,
            credCardNum,
            phone,
            address,
            name,
            cardType,
            zipCode,
            expirationDate,
            CVV,
            pickupTime,
            city,
            state,
            country
        } = req.body;

        const newOrder = await Orders.create({
            user_id: req.userId || req.body.user_id,
            // ProductsOrdered,
            email,
            credCardNum,
            phone,
            address,
            name,
            cardType,
            zipCode,
            expirationDate,
            CVV,
            pickupTime,
            city,
            state,
            country,
            Order_complete: false
        });

        console.log(`Order created by user ${req.userId}:`, newOrder._id);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};
