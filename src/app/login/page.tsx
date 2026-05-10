import AuthForm from '@/components/feature/auth-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-xl flex-col justify-center">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Login</p>
          <h1 className="text-3xl font-semibold">Return to your project workspace.</h1>
          <p className="text-slate-300">Use your email and password to access your dashboard and manage projects.</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
