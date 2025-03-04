import { Request, Response } from 'express';
import { productService } from '../services/productService';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage as string) : 10;

    const paginatedProducts = await productService.getAllProducts(page, itemsPerPage);
    res.json(paginatedProducts);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};