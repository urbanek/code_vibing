import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code Vibing',
  description: 'A clean foundation for a Next.js SaaS dashboard with Supabase, Drizzle, and Zod.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
