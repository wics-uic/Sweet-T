// This is am empty file
import express from "express";
import {
    addItemToCart, 
    updateItemQuantity, 
    deleteCart
} from "..controller/exampleController.js";

const route = express.Router();

route.post('/add', addItemToCart);
route.put('/update', updateItemQuantity);
route.delete('/:cardId', deleteCart);

export default route;