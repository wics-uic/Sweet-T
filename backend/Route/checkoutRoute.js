import express from 'express';
import { createOrder } from '../Controller/checkoutController.js';

const router = express.Router();

// POST - Create new order
router.post('/createOrder', createOrder);

export default router;
