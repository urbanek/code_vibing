'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrowserClient } from '@/lib/supabase/client';
import { loginSchema, registerSchema } from '@/lib/validators/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { type z } from 'zod';

type AuthMode = 'login' | 'register';

const schemas = {
  login: loginSchema,
  register: registerSchema,
};

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const { register, handleSubmit, formState } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schemas[mode]),
  });

  const onSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);

    const action = mode === 'login' ? 'login' : 'register';

    try {
      let result;

      if (action === 'login') {
        result = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      } else {
        result = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
      }

      if (result.error) {
        setServerError(result.error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-soft"
    >
      {serverError ? <Alert>{serverError}</Alert> : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
        {formState.errors.email ? <p className="text-xs text-red-300">{formState.errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
        {formState.errors.password ? <p className="text-xs text-red-300">{formState.errors.password.message}</p> : null}
      </div>
      {mode === 'register' ? (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...register('confirmPassword')} />
          {formState.errors.confirmPassword ? (
            <p className="text-xs text-red-300">{formState.errors.confirmPassword.message}</p>
          ) : null}
        </div>
      ) : null}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}
      </Button>
      <p className="text-sm text-slate-400">
        {mode === 'login'
          ? 'Secure access to your projects with Supabase Auth and session protection.'
          : 'We only need your email and password to get started.'}
      </p>
    </form>
  );
}
