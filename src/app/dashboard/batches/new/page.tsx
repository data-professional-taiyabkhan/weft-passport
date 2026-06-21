'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { generateBatchCode } from '@/lib/utils';

const TEXTILE_TYPES = ['Banarasi Silk', 'Chanderi', 'Kanchipuram Silk', 'Tussar Silk', 'Ikat', 'Jamdani', 'Pashmina', 'Block Print Cotton', 'Other'];
const WEAVE_TYPES = ['handloom', 'powerloom', 'semi_handloom', 'embroidery', 'block_print', 'other'];

export default function NewBatchPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    batch_code: generateBatchCode(),
    textile_type: '',
    weave_type: 'handloom',
    fibre_content: '',
    colour: '',
    pattern_name: '',
    pattern_description: '',
    production_location: '',
    field_notes: '',
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.from('batches').insert([{ ...form, status: 'draft' }]);
    if (error) { setError(error.message); setLoading(false); }
    else router.push('/dashboard/batches');
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard/batches" className="text-sm text-gray-400 hover:text-indigo-600 mb-2 inline-flex items-center gap-1">← Back to batches</Link>
        <h1 className="text-3xl font-serif text-indigo-900">New Production Batch</h1>
        <p className="text-gray-500 text-sm mt-1">Record a new textile production batch for certification</p>
      </div>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="font-semibold text-indigo-900 mb-4">Batch Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Batch Code</label>
              <input className="input bg-gray-50" value={form.batch_code} readOnly />
            </div>
            <div>
              <label className="label">Textile Type *</label>
              <select className="input" value={form.textile_type} onChange={e=>update('textile_type',e.target.value)} required>
                <option value="">Select type</option>
                {TEXTILE_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Weave Type *</label>
              <select className="input" value={form.weave_type} onChange={e=>update('weave_type',e.target.value)} required>
                {WEAVE_TYPES.map(t=><option key={t} value={t}>{t.replace('_',' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Fibre Content</label>
              <input className="input" value={form.fibre_content} onChange={e=>update('fibre_content',e.target.value)} placeholder="100% silk, cotton-silk blend…" />
            </div>
            <div>
              <label className="label">Colour</label>
              <input className="input" value={form.colour} onChange={e=>update('colour',e.target.value)} placeholder="Ivory, Deep Red…" />
            </div>
            <div>
              <label className="label">Pattern Name</label>
              <input className="input" value={form.pattern_name} onChange={e=>update('pattern_name',e.target.value)} placeholder="Jangla, Tanchoi…" />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Pattern Description</label>
            <textarea className="input h-20 resize-none" value={form.pattern_description} onChange={e=>update('pattern_description',e.target.value)} placeholder="Describe the weave pattern in detail…" />
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold text-indigo-900 mb-4">Production Details</h2>
          <div>
            <label className="label">Production Location</label>
            <input className="input" value={form.production_location} onChange={e=>update('production_location',e.target.value)} placeholder="Village, District, State" />
          </div>
          <div className="mt-4">
            <label className="label">Field Notes</label>
            <textarea className="input h-20 resize-none" value={form.field_notes} onChange={e=>update('field_notes',e.target.value)} placeholder="Any additional notes from the field…" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving…' : 'Save Batch as Draft'}</button>
          <Link href="/dashboard/batches" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
