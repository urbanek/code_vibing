'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProject, updateProject, deleteProject } from '@/server/actions/project-actions';
import { projectCreateSchema, projectUpdateSchema } from '@/lib/validators/project';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import type { Project } from '@/types/project';
import type { z } from 'zod';

type ProjectManagerProps = {
  initialProjects: Project[];
};

type CreateValues = z.infer<typeof projectCreateSchema>;
type UpdateValues = z.infer<typeof projectUpdateSchema>;

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createForm = useForm<CreateValues>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: { name: '', description: '' },
  });

  const updateForm = useForm<UpdateValues>({
    resolver: zodResolver(projectUpdateSchema),
    defaultValues: { id: '', name: '', description: '' },
  });

  const handleCreate = async (values: CreateValues) => {
    setFeedback(null);
    try {
      await createProject(values);
      createForm.reset();
      startTransition(() => router.refresh());
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to create project.');
    }
  };

  const handleUpdate = async (values: UpdateValues) => {
    setFeedback(null);
    try {
      await updateProject(values);
      setSelectedProject(null);
      startTransition(() => router.refresh());
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to update project.');
    }
  };

  const handleDelete = async (projectId: string) => {
    setFeedback(null);
    try {
      await deleteProject({ id: projectId });
      startTransition(() => router.refresh());
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Failed to delete project.');
    }
  };

  const startEdit = (project: Project) => {
    setSelectedProject(project);
    updateForm.reset({
      id: project.id,
      name: project.name,
      description: project.description ?? '',
    });
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Create project</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100">New project workflow</h2>
            <p className="mt-2 text-slate-400">Submit a new project and keep it private to your account.</p>
          </div>
          {feedback ? <Alert>{feedback}</Alert> : null}
          <form className="space-y-4" onSubmit={createForm.handleSubmit(handleCreate)}>
            <div className="space-y-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input id="project-name" {...createForm.register('name')} />
              {createForm.formState.errors.name ? (
                <p className="text-xs text-red-300">{createForm.formState.errors.name.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea id="project-description" {...createForm.register('description')} />
              {createForm.formState.errors.description ? (
                <p className="text-xs text-red-300">{createForm.formState.errors.description.message}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={isPending}> 
              {isPending ? 'Saving…' : 'Create project'}
            </Button>
          </form>
        </Card>

        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Projects</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100">Your projects</h2>
            <p className="mt-2 text-slate-400">Edit or remove projects you no longer need.</p>
          </div>
          {initialProjects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              description="Create a project and it will appear here for easy management."
            />
          ) : (
            <div className="space-y-4">
              {initialProjects.map((project) => (
                <article key={project.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100">{project.name}</h3>
                      <p className="mt-2 text-slate-400">{project.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <Button type="button" variant="secondary" onClick={() => startEdit(project)}>
                        Edit
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => void handleDelete(project.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Card>
      </section>

      {selectedProject ? (
        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Edit project</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100">Update project details</h2>
          </div>

          <form className="space-y-4" onSubmit={updateForm.handleSubmit(handleUpdate)}>
            <Input type="hidden" {...updateForm.register('id')} />
            <div className="space-y-2">
              <Label htmlFor="edit-name">Project name</Label>
              <Input id="edit-name" {...updateForm.register('name')} />
              {updateForm.formState.errors.name ? (
                <p className="text-xs text-red-300">{updateForm.formState.errors.name.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" {...updateForm.register('description')} />
              {updateForm.formState.errors.description ? (
                <p className="text-xs text-red-300">{updateForm.formState.errors.description.message}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isPending}>{isPending ? 'Updating…' : 'Save changes'}</Button>
              <Button type="button" variant="secondary" onClick={() => setSelectedProject(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
