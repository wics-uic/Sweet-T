// This is am empty file
import express from "express";

import {
    fetch,
    addProductToCart, 
    deleteProduct,
    deleteCart,
} from "../Controller/exampleController.js";

const route = express.Router();

route.get("/fetch", fetch); // grab payload from "add to bag" button
route.post("/create", addProductToCart);
route.delete("/deleteProduct/:id", deleteProduct);
route.delete("/deleteCart/:id", deleteCart);


export default route;
