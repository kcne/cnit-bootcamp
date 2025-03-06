import { Request, Response } from 'express';
import { inventoryService } from '../services/inventoryService';
import { InventoryQueryInput } from '../schemas/inventorySchema';

export const getAllInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const result = await inventoryService.findAll({
      pagination: { page, limit }
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error in getAllInventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

export const searchInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryOptions = req.body as InventoryQueryInput;
    const result = await inventoryService.findAll(queryOptions);
    res.json(result);
  } catch (error) {
    console.error('Error in searchInventory:', error);
    res.status(500).json({ error: 'Failed to search inventory' });
  }
};

export const getInventoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await inventoryService.findById(id);
    
    if (!item) {
      res.status(404).json({ error: 'Inventory item not found' });
      return;
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error in getInventoryById:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
};

export const createInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await inventoryService.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error in createInventory:', error);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
};

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await inventoryService.update(id, req.body);
    res.json(item);
  } catch (error) {
    console.error('Error in updateInventory:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

export const deleteInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await inventoryService.delete(id);
    res.json(item);
  } catch (error) {
    console.error('Error in deleteInventory:', error);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};

export const getLowStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const threshold = req.query.threshold ? parseInt(req.query.threshold as string) : 5;
    const items = await inventoryService.findLowStock(threshold);
    res.json(items);
  } catch (error) {
    console.error('Error in getLowStock:', error);
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
}; 