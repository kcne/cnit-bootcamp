import express from 'express';
import { 
  getAllProducts, 
  searchProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { validateRequest } from '../middlewares/validateRequest';
import { 
  productQuerySchema, 
  createProductSchema, 
  updateProductSchema 
} from '../schemas/productSchema';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/search', validateRequest(productQuerySchema), searchProducts);

// Create, update, delete (could add auth middleware here)
router.post('/', validateRequest(createProductSchema), createProduct);
router.put('/:id', validateRequest(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router; 