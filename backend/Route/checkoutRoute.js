import express from 'express';
import { createOrder, getAllOrders, completeOrder } from '../Controller/checkoutController.js';


const router = express.Router();

// POST - Create new order
router.post('/createOrder', createOrder);
router.get('/getAllOrders', getAllOrders);
router.put('/completeOrder', completeOrder);


export default router;