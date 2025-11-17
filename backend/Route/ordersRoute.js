

import express from "express";
import {getCompletedOrders} from "../Controller/ordersController.js";

const route = express.Router();

route.get("/getCompletedOrders", getCompletedOrders);

export default route;

