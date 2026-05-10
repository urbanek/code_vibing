import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(8, { message: 'Confirm your password.' }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    });
  }
});
