import express from 'express';
import { 
  getAllInventory, 
  searchInventory, 
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getLowStock
} from '../controllers/inventoryController';
import { validateRequest } from '../middlewares/validateRequest';
import { 
  inventoryQuerySchema, 
  createInventorySchema, 
  updateInventorySchema 
} from '../schemas/inventorySchema';

const router = express.Router();

// Public routes
router.get('/', getAllInventory);
router.get('/low-stock', getLowStock);
router.get('/:id', getInventoryById);
router.post('/search', validateRequest(inventoryQuerySchema), searchInventory);

// Create, update, delete routes
router.post('/', validateRequest(createInventorySchema), createInventory);
router.put('/:id', validateRequest(updateInventorySchema), updateInventory);
router.delete('/:id', deleteInventory);

export default router; 