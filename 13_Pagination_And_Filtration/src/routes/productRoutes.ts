import express from 'express';
import { getAllProducts } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);

export default router; 