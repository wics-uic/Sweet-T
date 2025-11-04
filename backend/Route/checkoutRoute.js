import express from 'express';
import { createOrder, getAllOrders } from '../Controller/checkoutController.js';


const router = express.Router();

// POST - Create new order
router.post('/createOrder', createOrder);
router.get('/getAllOrders', getAllOrders);


export default router;