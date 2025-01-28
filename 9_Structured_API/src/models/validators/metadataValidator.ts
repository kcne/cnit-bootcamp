import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(3),
  browser: z.string().min(3),
});


