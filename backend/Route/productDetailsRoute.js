

import express from "express";
import {create, fetch, update, deleteProduct} from "../Controller/productDetailsController.js";

const route = express.Router();



route.post("/create", create);
route.get("/getAllProductDetails", fetch);
route.put("/update/:name", update);
route.delete("/delete/:name", deleteProduct);
export default route;



