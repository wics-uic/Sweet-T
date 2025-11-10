import { Orders } from "../Model/checkoutModel.js";

export const createOrder = async (req, res) => {
    try {
        console.log("Testing recieved", req.body);
        const {
            // OrderedObjects,
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
            // OrderedObjects,
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


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();

        res.status(200).json({
            success: true,
            message: "Orders was fetched successfully",
            totalOrders: orders.length,
            orders
        });
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
        const { user_id } = req.body; // get user_id from the request body


        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "user_id is required"
            });
        }


        const updatedOrders = await Orders.updateMany(
            { user_id },
            { $set: { Order_complete: true } } // update
        );


        if (updatedOrders.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user_id"
            });
        }


        res.status(200).json({
            success: true,
            message: "Order(s) marked as complete successfully",
            modifiedCount: updatedOrders.modifiedCount
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

