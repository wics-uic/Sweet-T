import { Orders } from "../Model/checkoutModel.js";

export const createOrder = async (req, res) => {
    try {
        console.log("Received Order Request Body:", JSON.stringify(req.body, null, 2));
        console.log("User ID from request:", req.userId);
        const {
            ProductsOrdered,
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
            ProductsOrdered,
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
        console.error("Validation Errors:", error.errors); // Log Mongoose validation errors
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
            details: error.errors // Send validation details to frontend
        });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

export const completeOrder = async (req, res) => {
    try {
        const { orderId } = req.body; // get orderId from the request body

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "orderId is required"
            });
        }

        const updatedOrder = await Orders.findByIdAndUpdate(
            orderId,
            { $set: { Order_complete: true } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order marked as complete successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message
        });
    }
};

export const getCompletedOrders = async (req, res) => {
    try {
        const completedOrders = await Orders.find({ Order_complete: true });

        if (completedOrders.length === 0) {
            return res.status(200).json([]); // Return empty array instead of 404 for better frontend handling
        }

        return res.status(200).json(completedOrders);

    } catch (error) {
        console.error("Error fetching completed orders:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

