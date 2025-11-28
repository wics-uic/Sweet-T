// This is am empty file
import express from "express";

import {
    fetchUserCart,
    addProductToCart,
    deleteProduct,
    clearCart,
    updateProductQuantity
} from "../Controller/exampleController.js";

const route = express.Router();

route.get("/fetch", fetchUserCart);
route.post("/add", addProductToCart);
route.delete("/delete/:id", deleteProduct);
route.delete("/clear", clearCart);
route.put("/update/:id", updateProductQuantity);

export default route;
