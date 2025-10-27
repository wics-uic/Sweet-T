

import express from "express";
import {create} from "../Controller/productDetailsController.js";

const route = express.Router();



route.post("/create", create);
route.get("/getAllProductDetails", getAllProductDetails);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProduct);
export default route;