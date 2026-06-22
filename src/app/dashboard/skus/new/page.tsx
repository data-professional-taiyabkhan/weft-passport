'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const PRODUCT_TYPES = ['Saree', 'Dupatta', 'Fabric (per metre)', 'Shawl', 'Stole', 'Cushion Cover', 'Table Runner', 'Other'];

export default function NewSKUPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    sku_code: `SKU-${Date.now().toString(36).toUpperCase()}`,
    product_name: '',
    product_type: '',
    collection: '',
    season: '',
    retail_price: '',
    currency: 'GBP',
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.from('skus').insert([{
      ...form,
      retail_price: form.retail_price ? parseFloat(form.retail_price) : null,
      provenance_page_live: false,
      attribution_pct: 100,
      brand_id: (await supabase.from('brands').select('id').limit(1).single()).data?.id,
    }]);
    if (error) { setError(error.message); setLoading(false); }
    else router.push('/dashboard/skus');
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard/skus" className="text-sm text-gray-400 hover:text-indigo-600 mb-2 inline-flex items-center gap-1">← Back to SKUs</Link>
        <h1 className="text-3xl font-serif text-indigo-900">Add New SKU</h1>
        <p className="text-gray-500 text-sm mt-1">Create a product SKU to link with a certified batch</p>
      </div>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="font-semibold text-indigo-900 mb-4">Product Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">SKU Code</label>
              <input className="input bg-gray-50" value={form.sku_code} readOnly />
            </div>
            <div>
              <label className="label">Product Type</label>
              <select className="input" value={form.product_type} onChange={e => update('product_type', e.target.value)}>
                <option value="">Select type</option>
                {PRODUCT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Product Name *</label>
              <input className="input" value={form.product_name} onChange={e => update('product_name', e.target.value)} placeholder="e.g. Ivory Jangla Banarasi Silk Saree" required />
            </div>
            <div>
              <label className="label">Collection</label>
              <input className="input" value={form.collection} onChange={e => update('collection', e.target.value)} placeholder="e.g. Heritage Edit 2026" />
            </div>
            <div>
              <label className="label">Season</label>
              <input className="input" value={form.season} onChange={e => update('season', e.target.value)} placeholder="e.g. SS26" />
            </div>
            <div>
              <label className="label">Retail Price (£)</label>
              <input type="number" step="0.01" min="0" className="input" value={form.retail_price} onChange={e => update('retail_price', e.target.value)} placeholder="0.00" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving…' : 'Create SKU'}</button>
          <Link href="/dashboard/skus" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
