import prisma from '../prisma';
import { Product } from '@prisma/client';
import { PrismaRepositoryService } from './prismaRepositoryService';

type ProductFields = 'id' | 'name' | 'description' | 'createdAt';

export class ProductService extends PrismaRepositoryService<Product, ProductFields> {
  constructor() {
    super(prisma, prisma.product);
  }

  // You can add product-specific methods here
  async searchByName(name: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name
        }
      }
    });
  }
}

export const productService = new ProductService();
