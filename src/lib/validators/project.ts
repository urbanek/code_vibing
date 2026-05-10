import { z } from 'zod';

export const projectCreateSchema = z.object({
  name: z.string().min(3, { message: 'Project name is required.' }).max(255),
  description: z.string().max(1024).optional().or(z.literal('')),
});

export const projectUpdateSchema = projectCreateSchema.extend({
  id: z.string().uuid({ message: 'Valid project id is required.' }),
});

export const projectDeleteSchema = z.object({
  id: z.string().uuid({ message: 'Valid project id is required.' }),
});
