import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  native_language: z.string().length(2),
  learning_languages: z
    .array(
      z.object({
        language: z.string().length(2),
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      }),
    )
    .min(1)
    .max(2),
});
