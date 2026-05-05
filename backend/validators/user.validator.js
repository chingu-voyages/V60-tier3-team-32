import { z } from 'zod';

export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  native_language: z.string().min(3).max(3).optional(),
  learning_languages: z
    .array(
      z.object({
        language: z.string().min(3).max(3),
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      }),
    )
    .max(2)
    .optional(),
});
