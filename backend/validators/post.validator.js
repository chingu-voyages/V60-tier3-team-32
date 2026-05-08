import { z } from 'zod';

export const createPostSchema = z.object({
  language: z
    .string()
    .min(3)
    .max(3)
    .transform((val) => val.toLowerCase()),
  fluency_level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  content: z
    .string()
    .min(1)
    .trim()
    .regex(/\p{L}/u, 'Content must contain at least one letter'),
  prompt_id: z.string().optional(),
  status: z.enum(['draft', 'submitted']).default('draft'),
});
export const updatePostSchema = z.object({
  language: z.string().min(3).max(3).optional(),
  content: z.string().min(1).optional(),
  status: z.enum(['draft', 'submitted']).optional(),
});
