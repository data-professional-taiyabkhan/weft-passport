'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // After OAuth callback, redirect to the dashboard
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    });
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-serif font-bold text-xl">WP</span>
        </div>
        <p className="text-gray-500 text-sm animate-pulse-soft">Setting up your account…</p>
      </div>
    </div>
  );
}
