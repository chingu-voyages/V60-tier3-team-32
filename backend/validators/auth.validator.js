import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  native_language: z
    .string()
    .min(2)
    .max(2)
    .transform((val) => val.toLowerCase()),
  learning_languages: z
    .array(
      z.object({
        language: z
          .string()
          .min(2)
          .max(2)
          .transform((val) => val.toLowerCase()),
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      }),
    )
    .min(1)
    .max(2),
});
