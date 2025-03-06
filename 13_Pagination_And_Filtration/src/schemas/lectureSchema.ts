import { z } from 'zod';

// Define allowed fields for sorting and filtering
const lectureFields = ['id', 'name', 'description', 'duration', 'createdAt', 'userId'] as const;
const filterOperators = ['equals', 'contains', 'gt', 'lt', 'gte', 'lte'] as const;

export const lectureQuerySchema = z.object({
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10)
  }),
  sort: z.object({
    field: z.enum(lectureFields),
    order: z.enum(['asc', 'desc'])
  }).optional(),
  filters: z.array(
    z.object({
      field: z.enum(lectureFields),
      operator: z.enum(filterOperators),
      value: z.union([z.string(), z.number()])
    })
  ).optional(),
  includeUser: z.boolean().optional().default(false)
});

export const createLectureSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  duration: z.number().int().positive()
});

export const updateLectureSchema = createLectureSchema.partial();

export type LectureQueryInput = z.infer<typeof lectureQuerySchema>;
export type CreateLectureInput = z.infer<typeof createLectureSchema>;
export type UpdateLectureInput = z.infer<typeof updateLectureSchema>; 