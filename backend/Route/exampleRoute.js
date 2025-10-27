import express from 'express';
import { createExample } from '../Controller/exampleController.js';

const router = express.Router();

// POST - Create new example
router.post('/createExample', createExample);

export default router;