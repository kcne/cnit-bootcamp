import { z } from 'zod';

// Define allowed fields for sorting and filtering
const inventoryFields = ['id', 'name', 'description', 'stock', 'createdAt'] as const;
const filterOperators = ['equals', 'contains', 'gt', 'lt', 'gte', 'lte'] as const;

export const inventoryQuerySchema = z.object({
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10)
  }),
  sort: z.object({
    field: z.enum(inventoryFields),
    order: z.enum(['asc', 'desc'])
  }).optional(),
  filters: z.array(
    z.object({
      field: z.enum(inventoryFields),
      operator: z.enum(filterOperators),
      value: z.union([z.string(), z.number()])
    })
  ).optional()
});

export const createInventorySchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  stock: z.number().int().nonnegative().default(1)
});

export const updateInventorySchema = createInventorySchema.partial();

export type InventoryQueryInput = z.infer<typeof inventoryQuerySchema>;
export type CreateInventoryInput = z.infer<typeof createInventorySchema>;
export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>; 