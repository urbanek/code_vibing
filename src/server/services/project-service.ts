import { desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { projects } from '@/db/schema';
import type { Project } from '@/types/project';

const projectRowToModel = (row: any): Project => ({
  id: row.id,
  user_id: row.user_id,
  name: row.name,
  description: row.description,
  created_at: row.created_at.toISOString(),
  updated_at: row.updated_at.toISOString(),
});

export const projectService = {
  async getProjectsByUser(userId: string): Promise<Project[]> {
    const rows = await db.select().from(projects).where(eq(projects.user_id, userId)).orderBy(desc(projects.created_at));
    return rows.map(projectRowToModel);
  },

  async createProject(userId: string, data: { name: string; description?: string | null }) {
    await db.insert(projects).values({
      user_id: userId,
      name: data.name,
      description: data.description || null,
    });
  },

  async updateProject(userId: string, data: { id: string; name: string; description?: string | null }) {
    await db
      .update(projects)
      .set({ name: data.name, description: data.description || null })
      .where(eq(projects.id, data.id), eq(projects.user_id, userId));
  },

  async deleteProject(userId: string, projectId: string) {
    await db.delete(projects).where(eq(projects.id, projectId), eq(projects.user_id, userId));
  },
};
