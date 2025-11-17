

import Order from "../Model/ordersModel.js"

// GETting all completed orders

export const getCompletedOrders = async (req, res) => {
    try {
        const completedOrders = await Order.find({ Order_complete: true });

        if (completedOrders.length === 0) {
            return res.status(404).json({ message: "No completed orders" });
        }

        return res.status(200).json(completedOrders);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




   