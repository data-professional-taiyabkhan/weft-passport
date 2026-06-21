'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewArtisanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    full_name: '', gender: '', date_of_birth: '',
    village: '', district: '', state: '', country: 'India',
    cooperative_name: '', govt_scheme_id: '', aadhaar_hash: '',
    specialisation: '', years_experience: '', loom_type: 'handloom',
    status: 'pending', bio: '',
  });

  const set = (k: string, v: string) => setForm(f => ({...f, [k]: v}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const supabase = createClient();
    const num = Math.floor(Math.random() * 90000) + 10000;
    const artisan_code = `WP-ART-${num}`;
    const { error } = await supabase.from('artisans').insert([{ ...form, artisan_code, years_experience: Number(form.years_experience) || null }]);
    if (error) { setError(error.message); setLoading(false); }
    else router.push('/dashboard/artisans');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/artisans" className="p-2 rounded-lg hover:bg-cream-200 transition-all">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <div className="page-header mb-0">
          <h1>Register Artisan</h1>
          <p>Add a new verified artisan to the Weft Passport registry</p>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-4">
          <h3 className="font-serif text-indigo-900 text-lg border-b border-weft-border pb-3">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="label">Full Name *</label>
              <input className="input" placeholder="Mohammad Yaseen" required value={form.full_name} onChange={e => set('full_name', e.target.value)} /></div>
            <div><label className="label">Gender</label>
              <select className="input" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
              </select></div>
            <div><label className="label">Date of Birth</label>
              <input type="date" className="input" value={form.date_of_birth} onChange={e => set('date_of_birth', e.target.value)} /></div>
            <div><label className="label">Village</label>
              <input className="input" placeholder="Pindra" value={form.village} onChange={e => set('village', e.target.value)} /></div>
            <div><label className="label">District</label>
              <input className="input" placeholder="Varanasi" value={form.district} onChange={e => set('district', e.target.value)} /></div>
            <div><label className="label">State</label>
              <input className="input" placeholder="Uttar Pradesh" value={form.state} onChange={e => set('state', e.target.value)} /></div>
            <div><label className="label">Country</label>
              <input className="input" value={form.country} onChange={e => set('country', e.target.value)} /></div>
          </div>
        </div>

        <div className="card space-y-4">
          <h3 className="font-serif text-indigo-900 text-lg border-b border-weft-border pb-3">Craft Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="label">Specialisation</label>
              <input className="input" placeholder="Banarasi brocade, kadwa weave" value={form.specialisation} onChange={e => set('specialisation', e.target.value)} /></div>
            <div><label className="label">Loom Type</label>
              <select className="input" value={form.loom_type} onChange={e => set('loom_type', e.target.value)}>
                <option value="handloom">Handloom</option><option value="jacquard">Jacquard</option>
                <option value="pit_loom">Pit Loom</option><option value="frame_loom">Frame Loom</option>
              </select></div>
            <div><label className="label">Years Experience</label>
              <input type="number" className="input" min={0} max={80} placeholder="12" value={form.years_experience} onChange={e => set('years_experience', e.target.value)} /></div>
            <div className="col-span-2"><label className="label">Cooperative / Cluster</label>
              <input className="input" placeholder="Varanasi Handloom Weavers Cooperative" value={form.cooperative_name} onChange={e => set('cooperative_name', e.target.value)} /></div>
            <div><label className="label">Govt Scheme ID</label>
              <input className="input" placeholder="UP-HW-00123" value={form.govt_scheme_id} onChange={e => set('govt_scheme_id', e.target.value)} /></div>
            <div><label className="label">Status</label>
              <select className="input" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="pending">Pending</option><option value="verified">Verified</option><option value="suspended">Suspended</option>
              </select></div>
            <div className="col-span-2"><label className="label">Bio / Story</label>
              <textarea className="input" rows={3} placeholder="Brief artisan biography and weaving story…"
                value={form.bio} onChange={e => set('bio', e.target.value)} /></div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Link href="/dashboard/artisans" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            <Save size={16} />{loading ? 'Saving…' : 'Register Artisan'}
          </button>
        </div>
      </form>
    </div>
  );
}
