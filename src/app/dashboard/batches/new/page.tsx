'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

const WEAVE_TYPES = ['handloom','powerloom','semi_handloom','embroidery','block_print','other'];
const TEXTILE_TYPES = ['Banarasi Silk','Chanderi','Maheshwari','Kanjivaram','Pochampally Ikat','Pashmina','Muslin','Other'];

export default function NewBatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    textile_type: '', weave_type: 'handloom', fibre_content: '',
    colour: '', pattern_name: '', pattern_description: '',
    production_started_at: '', production_completed_at: '',
    production_location: '', field_notes: '',
  });

  const set = (k: string, v: string) => setForm(f => ({...f, [k]: v}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const supabase = createClient();
    const year = new Date().getFullYear();
    const num = Math.floor(Math.random() * 9000) + 1000;
    const batch_code = `WP-BTH-${year}-${num}`;
    const { error } = await supabase.from('batches').insert([{ ...form, batch_code, status: 'draft' }]);
    if (error) { setError(error.message); setLoading(false); }
    else router.push('/dashboard/batches');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/batches" className="p-2 rounded-lg hover:bg-cream-200 transition-all">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <div className="page-header mb-0">
          <h1>New Production Batch</h1>
          <p>Record a new handloom production batch for certification</p>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textile Info */}
        <div className="card space-y-5">
          <h3 className="font-serif text-indigo-900 text-lg border-b border-weft-border pb-3">Textile Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Textile Type *</label>
              <select className="input" required value={form.textile_type} onChange={e => set('textile_type', e.target.value)}>
                <option value="">Select textile type</option>
                {TEXTILE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Weave Type *</label>
              <select className="input" required value={form.weave_type} onChange={e => set('weave_type', e.target.value)}>
                {WEAVE_TYPES.map(t => <option key={t} value={t} className="capitalize">{t.replace('_',' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Fibre Content</label>
              <input className="input" placeholder="100% silk" value={form.fibre_content} onChange={e => set('fibre_content', e.target.value)} />
            </div>
            <div>
              <label className="label">Colour</label>
              <input className="input" placeholder="Deep indigo" value={form.colour} onChange={e => set('colour', e.target.value)} />
            </div>
            <div>
              <label className="label">Pattern Name</label>
              <input className="input" placeholder="Buta motif" value={form.pattern_name} onChange={e => set('pattern_name', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="label">Pattern Description</label>
              <textarea className="input" rows={2} placeholder="Describe the weave pattern and motifs..."
                value={form.pattern_description} onChange={e => set('pattern_description', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Production Info */}
        <div className="card space-y-5">
          <h3 className="font-serif text-indigo-900 text-lg border-b border-weft-border pb-3">Production Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Started</label>
              <input type="date" className="input" value={form.production_started_at} onChange={e => set('production_started_at', e.target.value)} />
            </div>
            <div>
              <label className="label">Completed</label>
              <input type="date" className="input" value={form.production_completed_at} onChange={e => set('production_completed_at', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="label">Production Location</label>
              <input className="input" placeholder="Varanasi, Uttar Pradesh" value={form.production_location} onChange={e => set('production_location', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="label">Field Notes</label>
              <textarea className="input" rows={3} placeholder="Any additional notes from the field..."
                value={form.field_notes} onChange={e => set('field_notes', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Link href="/dashboard/batches" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            <Save size={16} />
            {loading ? 'Saving…' : 'Save Batch'}
          </button>
        </div>
      </form>
    </div>
  );
}
