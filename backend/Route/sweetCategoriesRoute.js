import express from 'express';
import { create_category, get_categories } from '../Controller/sweetCategoriesController.js';

const router = express.Router();

// GET
router.get('/get_categories', get_categories);
// POST
router.post('/create_category', create_category);

export default router;