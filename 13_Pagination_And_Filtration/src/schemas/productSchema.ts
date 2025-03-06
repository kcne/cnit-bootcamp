import { z } from 'zod';

// Define allowed fields for sorting and filtering
const productFields = ['id', 'name', 'description', 'createdAt'] as const;
const filterOperators = ['equals', 'contains', 'gt', 'lt', 'gte', 'lte'] as const;

export const productQuerySchema = z.object({
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10)
  }),
  sort: z.object({
    field: z.enum(productFields),
    order: z.enum(['asc', 'desc'])
  }).optional(),
  filters: z.array(
    z.object({
      field: z.enum(productFields),
      operator: z.enum(filterOperators),
      value: z.union([z.string(), z.number()])
    })
  ).optional()
});

export const createProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500)
});

export const updateProductSchema = createProductSchema.partial();

export type ProductQueryInput = z.infer<typeof productQuerySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>; 