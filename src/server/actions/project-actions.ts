'use server';

import { projectCreateSchema, projectDeleteSchema, projectUpdateSchema } from '@/lib/validators/project';
import { getCurrentUser } from '@/lib/supabase/server';
import { projectService } from '@/server/services/project-service';

export async function createProject(values: unknown) {
  const parsed = projectCreateSchema.parse(values);
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('You must be signed in to create a project.');
  }

  await projectService.createProject(user.id, parsed);
}

export async function updateProject(values: unknown) {
  const parsed = projectUpdateSchema.parse(values);
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('You must be signed in to update a project.');
  }

  await projectService.updateProject(user.id, parsed);
}

export async function deleteProject(values: unknown) {
  const parsed = projectDeleteSchema.parse(values);
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('You must be signed in to delete a project.');
  }

  await projectService.deleteProject(user.id, parsed.id);
}
