import { z } from 'zod';

export const learningLanguageSchema = z.object({
  language: z.string().min(1, 'Please select a learning language'),
  level: z.string().min(1, 'Please select a fluency level'),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, 'Username must be at least 4 characters')
      .max(12, 'Username must be 12 characters or less'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    nativeLanguage: z.string().min(1, 'Please select your native language'),
    learningLanguages: z
      .array(learningLanguageSchema)
      .min(1, 'Please add at least one learning language'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .superRefine((data, ctx) => {
    const seen = new Set();

    data.learningLanguages.forEach((item, index) => {
      if (item.language === data.nativeLanguage) {
        ctx.addIssue({
          code: 'custom',
          path: ['learningLanguages', index, 'language'],
          message: 'Learning language cannot be the same as native language',
        });
      }

      if (seen.has(item.language)) {
        ctx.addIssue({
          code: 'custom',
          path: ['learningLanguages', index, 'language'],
          message: 'Duplicate learning language',
        });
      }

      seen.add(item.language);
    });
  });
