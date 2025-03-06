import prisma from '../prisma';
import { Inventory } from '@prisma/client';
import { PrismaRepositoryService } from './prismaRepositoryService';

type InventoryFields = 'id' | 'name' | 'description' | 'stock' | 'createdAt';

export class InventoryService extends PrismaRepositoryService<Inventory, InventoryFields> {
  constructor() {
    super(prisma, prisma.inventory);
  }

  // Add inventory-specific methods here if needed
  async findLowStock(threshold: number = 5) {
    return this.prisma.inventory.findMany({
      where: {
        stock: {
          lte: threshold
        }
      },
      orderBy: {
        stock: 'asc'
      }
    });
  }
}

export const inventoryService = new InventoryService(); 