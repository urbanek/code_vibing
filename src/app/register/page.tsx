import AuthForm from '@/components/feature/auth-form';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-xl flex-col justify-center">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Register</p>
          <h1 className="text-3xl font-semibold">Create your account and start building.</h1>
          <p className="text-slate-300">Sign up and save your projects in a secure Supabase Postgres database.</p>
        </div>
        <AuthForm mode="register" />
      </div>
    </main>
  );
}
