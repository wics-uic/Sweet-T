

import express from "express";
import {create, fetch, update} from "../Controller/productDetailsController.js";

const route = express.Router();



route.post("/create", create);
route.get("/getAllProductDetails", fetch);
route.put("/update/:name", update);
// route.delete("/delete/:id", deleteProduct);
export default route;