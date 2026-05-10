import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { projectService } from '@/server/services/project-service';
import ProjectManager from '@/components/feature/project-manager';
import { SignOutButton } from '@/components/feature/sign-out-button';
import { Card } from '@/components/ui/card';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const projects = await projectService.getProjectsByUser(user.id);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Dashboard</p>
            <h1 className="text-3xl font-semibold">Welcome back, {user.email ?? user.id}</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              View your projects, update existing work, and keep your data secure with database row-level access controls.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <Card className="rounded-[1.5rem] border-slate-800 bg-slate-900/70 p-6 shadow-soft">
              <p className="text-sm text-slate-300">Your current session</p>
              <p className="mt-2 font-medium text-slate-100">{user.email ?? 'Current user'}</p>
            </Card>
            <SignOutButton />
          </div>
        </div>
        <ProjectManager initialProjects={projects} />
      </div>
    </main>
  );
}
