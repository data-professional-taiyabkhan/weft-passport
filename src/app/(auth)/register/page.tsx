'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const ROLES = [
  { value: 'brand', label: '🏷️ Fashion Brand', desc: 'I source or sell South Asian handloom textiles' },
  { value: 'field_coordinator', label: '📋 Field Coordinator', desc: 'I work directly with artisan communities' },
];

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('brand');
  const [form, setForm] = useState({ full_name:'', email:'', organisation:'', password:'', confirm_password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k: string, v: string) => setForm(f=>({...f,[k]:v}));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name, organisation: form.organisation, role } }
    });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push('/dashboard'); router.refresh(); }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center font-bold text-white text-xl">WP</div>
          </div>
          <h2 className="text-3xl font-serif text-indigo-900 mb-2">Join Weft Passport</h2>
          <p className="text-gray-500 text-sm">Step {step} of 2 — {step===1 ? 'Choose your role' : 'Create your account'}</p>
        </div>
        <div className="flex gap-2 mb-8">
          {[1,2].map(s=>(
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s<=step ? 'bg-indigo-900' : 'bg-gray-200'}`} />
          ))}
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
        {step === 1 ? (
          <div className="space-y-3">
            {ROLES.map(r=>(
              <button key={r.value} onClick={()=>setRole(r.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  role===r.value ? 'border-indigo-900 bg-indigo-50' : 'border-weft-border bg-white hover:border-indigo-300'
                }`}>
                <div className="font-semibold text-weft-text">{r.label}</div>
                <div className="text-sm text-gray-500 mt-1">{r.desc}</div>
              </button>
            ))}
            <button onClick={()=>setStep(2)} className="btn-primary w-full justify-center py-3 mt-4">Continue →</button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full name</label>
                <input className="input" value={form.full_name} onChange={e=>update('full_name',e.target.value)} placeholder="Mahjabeen Bano" required />
              </div>
              <div>
                <label className="label">Organisation</label>
                <input className="input" value={form.organisation} onChange={e=>update('organisation',e.target.value)} placeholder="Silk & Soil Ltd" />
              </div>
            </div>
            <div>
              <label className="label">Email address</label>
              <input type="email" className="input" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@brand.com" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Password</label>
                <input type="password" className="input" value={form.password} onChange={e=>update('password',e.target.value)} placeholder="Min 8 chars" required />
              </div>
              <div>
                <label className="label">Confirm password</label>
                <input type="password" className="input" value={form.confirm_password} onChange={e=>update('confirm_password',e.target.value)} placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
            <button type="button" onClick={()=>setStep(1)} className="btn-ghost w-full justify-center">← Back</button>
          </form>
        )}
        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
