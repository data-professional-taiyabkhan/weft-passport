'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const ROLES = [
  {
    id: 'brand',
    label: 'Fashion Brand',
    description: 'UK/EU brand sourcing handloom textiles',
    icon: '👗',
  },
  {
    id: 'field_coordinator',
    label: 'Field Coordinator',
    description: 'Artisan community coordinator / verifier',
    icon: '🧵',
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ full_name: '', email: '', organisation: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name, organisation: form.organisation, role } },
    });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push('/login?registered=1'); }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center font-bold text-saffron-400 text-xl">W</div>
          <span className="text-indigo-900 font-serif text-2xl font-bold">Weft Passport</span>
        </div>

        <div className="card">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s ? 'bg-indigo-900 text-white' : 'bg-gray-100 text-gray-400'
                }`}>{s}</div>
                <div className={`flex-1 h-1 rounded ${ s < 2 ? (step > s ? 'bg-indigo-900' : 'bg-gray-100') : 'hidden'}`} />
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 className="text-2xl font-serif text-indigo-900 mb-2">Choose your role</h2>
              <p className="text-gray-500 text-sm mb-6">Select how you&apos;ll use Weft Passport</p>
              <div className="space-y-3 mb-8">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      role === r.id
                        ? 'border-indigo-900 bg-indigo-50'
                        : 'border-weft-border hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className="font-semibold text-weft-text">{r.label}</div>
                      <div className="text-sm text-gray-500">{r.description}</div>
                    </div>
                    {role === r.id && <div className="ml-auto text-indigo-900">✓</div>}
                  </button>
                ))}
              </div>
              <button
                disabled={!role}
                onClick={() => setStep(2)}
                className="btn-primary w-full justify-center py-3 disabled:opacity-40"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-serif text-indigo-900 mb-2">Create your account</h2>
              <p className="text-gray-500 text-sm mb-6">Fill in your details to request access</p>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="label">Full name</label>
                    <input className="input" placeholder="Mahjabeen Bano" required
                      value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Organisation</label>
                    <input className="input" placeholder="Silk & Soil Ltd"
                      value={form.organisation} onChange={e => setForm({...form, organisation: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Work email</label>
                    <input type="email" className="input" placeholder="you@brand.com" required
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Min. 8 chars" required minLength={8}
                      value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  </div>
                  <div>
                    <label className="label">Confirm password</label>
                    <input type="password" className="input" placeholder="Repeat" required
                      value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">Back</button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
                    {loading ? 'Creating…' : 'Request access'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-700 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
