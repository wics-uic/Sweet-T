

import express from "express";
import {getCompletedOrders, getAllOrders} from "../Controller/ordersController.js";

const route = express.Router();

route.get("/getCompletedOrders", getCompletedOrders);
route.get("/getAllOrders", getAllOrders);

export default route;

