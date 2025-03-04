import prisma from '../prisma';

interface ProductPaginationResult {
  items: any[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export class ProductService {
  async getAllProducts(page: number = 1, itemsPerPage: number = 10): Promise<ProductPaginationResult> {
    // Ensure valid pagination parameters
    const validPage = Math.max(1, page);
    const validItemsPerPage = Math.max(1, Math.min(100, itemsPerPage)); // Limit max items per page to 100
    const skip = (validPage - 1) * validItemsPerPage;

    // Execute both queries in parallel
    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: validItemsPerPage,
        orderBy: {
          id: 'desc'
        }
      }),
      prisma.product.count()
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / validItemsPerPage);

    return {
      items: products,
      meta: {
        currentPage: validPage,
        itemsPerPage: validItemsPerPage,
        totalItems,
        totalPages,
        hasNextPage: validPage < totalPages,
        hasPreviousPage: validPage > 1
      }
    };
  }
}

export const productService = new ProductService();
