'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    router.push('/login');
  };

  return (
    <Button onClick={signOut} disabled={isLoading}>
      {isLoading ? 'Signing out…' : 'Sign out'}
    </Button>
  );
}
