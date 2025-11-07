// This is am empty file
import express from "express";

import {
    fetch,
    addProductToCart, 
    update, 
    deleteProduct,
} from "../Controller/exampleController.js";

const route = express.Router();

route.get("/fetch", fetch); // grab payload from "add to bag" button
route.post("/create", addProductToCart);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProduct);

export default route;