// This is am empty file
import express from "express";

import {
    fetch,
    addItemToCart, 
    update, 
    deleteProduct
} from "..controller/exampleController.js";

const route = express.Router();

route.get("/fetch", fetch); // grab payload from "add to bag" button
route.post("/create", addItemToCart);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProduct);

export default route;