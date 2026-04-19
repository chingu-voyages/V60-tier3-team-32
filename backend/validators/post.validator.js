import { z } from 'zod';

export const createPostSchema = z.object({
  language: z
    .string()
    .min(2)
    .max(2)
    .transform((val) => val.toLowerCase()),
  content: z.string().min(1),
  prompt_id: z.string().optional(),
  status: z.enum(['draft', 'submitted']).default('draft'),
});
export const updatePostSchema = z.object({
  language: z.string().min(2).max(2).optional(),
  content: z.string().min(1).optional(),
});
