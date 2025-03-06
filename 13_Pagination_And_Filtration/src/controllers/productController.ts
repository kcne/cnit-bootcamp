import { Request, Response } from 'express';
import { productService } from '../services/productService';
import { ProductQueryInput } from '../schemas/productSchema';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Simple query params for basic listing
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const result = await productService.findAll({
      pagination: { page, limit }
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.body is already validated by middleware
    const queryOptions = req.body as ProductQueryInput;
    const result = await productService.findAll(queryOptions);
    res.json(result);
  } catch (error) {
    console.error('Error in searchProducts:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.findById(id);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.body is already validated by middleware
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.update(id, req.body);
    res.json(product);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.delete(id);
    res.json(product);
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};