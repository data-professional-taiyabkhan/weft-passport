'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { generateArtisanCode, generateLoomCode, generateBatchCode } from '@/lib/utils';

const STEPS = ['Select Type', 'Enter Details', 'Upload Evidence', 'Submit'];

export default function FieldCapturePage() {
  const router = useRouter();
  const supabase = createClient();
  const [captureType, setCaptureType] = useState<'artisan'|'loom'|'batch'|null>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<Record<string,string>>({});
  const update = (k: string, v: string) => setForm(f=>({...f,[k]:v}));

  const handleCapture = async () => {
    setLoading(true);
    try {
      if (captureType === 'artisan') {
        await supabase.from('artisans').insert([{
          artisan_code: generateArtisanCode(),
          full_name: form.full_name,
          village: form.village,
          district: form.district,
          state: form.state || 'Uttar Pradesh',
          cooperative_name: form.cooperative_name,
          specialisations: form.specialisations ? [form.specialisations] : [],
          status: 'pending',
        }]);
      } else if (captureType === 'batch') {
        await supabase.from('batches').insert([{
          batch_code: generateBatchCode(),
          textile_type: form.textile_type,
          weave_type: form.weave_type || 'handloom',
          production_location: form.production_location,
          field_notes: form.field_notes,
          status: 'submitted',
        }]);
      }
      setSuccess(true);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  if (success) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="card text-center max-w-md">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-serif text-indigo-900">Captured!</h2>
        <p className="text-gray-500 mt-2">Record saved successfully. It will sync to the platform registry.</p>
        <div className="flex gap-3 mt-6 justify-center">
          <button onClick={()=>{setSuccess(false);setCaptureType(null);setStep(0);setForm({});}} className="btn-primary">Capture Another</button>
          <button onClick={()=>router.push('/dashboard')} className="btn-ghost">Dashboard</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Field Capture</h1>
        <p className="text-gray-500 text-sm mt-1">Record artisan data, looms, and production batches from the field</p>
      </div>

      {/* Online/Offline indicator */}
      <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm text-green-700 font-medium">Online — data will sync immediately</span>
      </div>

      {!captureType ? (
        <div>
          <p className="text-sm text-gray-500 mb-4">What would you like to capture?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { type: 'artisan', icon: '🧵', label: 'Artisan', desc: 'Register a new weaver into the registry' },
              { type: 'loom', icon: '🧶', label: 'Loom', desc: 'Document a loom with photo evidence' },
              { type: 'batch', icon: '📦', label: 'Batch', desc: 'Record a new textile production batch' },
            ].map(opt => (
              <button key={opt.type} onClick={()=>{setCaptureType(opt.type as any); setStep(1);}}
                className="card hover:border-indigo-400 hover:shadow-weft-lg transition-all text-left border-2 border-weft-border cursor-pointer">
                <div className="text-4xl mb-3">{opt.icon}</div>
                <h3 className="font-semibold text-weft-text">{opt.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            {STEPS.map((s,i)=>(
              <div key={s} className={`flex items-center gap-1 text-xs font-medium ${ i<=step ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${ i<step ? 'bg-indigo-900 text-white' : i===step ? 'bg-saffron-400 text-indigo-950' : 'bg-gray-200 text-gray-400'}`}>{i+1}</div>
                <span className="hidden sm:inline">{s}</span>
                {i<STEPS.length-1 && <span className="mx-1 text-gray-300">/</span>}
              </div>
            ))}
          </div>

          {captureType === 'artisan' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-indigo-900">Artisan Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="label">Full Name *</label><input className="input" value={form.full_name||''} onChange={e=>update('full_name',e.target.value)} placeholder="Ravi Kumar" required /></div>
                <div><label className="label">Village</label><input className="input" value={form.village||''} onChange={e=>update('village',e.target.value)} placeholder="Madanpura" /></div>
                <div><label className="label">District</label><input className="input" value={form.district||''} onChange={e=>update('district',e.target.value)} placeholder="Varanasi" /></div>
                <div><label className="label">State</label><input className="input" value={form.state||''} onChange={e=>update('state',e.target.value)} placeholder="Uttar Pradesh" /></div>
                <div><label className="label">Cooperative</label><input className="input" value={form.cooperative_name||''} onChange={e=>update('cooperative_name',e.target.value)} placeholder="Banarasi Bunkar Sahkar" /></div>
                <div className="col-span-2"><label className="label">Specialisation</label><input className="input" value={form.specialisations||''} onChange={e=>update('specialisations',e.target.value)} placeholder="Banarasi Silk, Brocade" /></div>
              </div>
            </div>
          )}

          {captureType === 'batch' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-indigo-900">Batch Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Textile Type *</label><input className="input" value={form.textile_type||''} onChange={e=>update('textile_type',e.target.value)} placeholder="Banarasi Silk" required /></div>
                <div><label className="label">Weave Type</label>
                  <select className="input" value={form.weave_type||'handloom'} onChange={e=>update('weave_type',e.target.value)}>
                    {['handloom','embroidery','block_print','other'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2"><label className="label">Production Location</label><input className="input" value={form.production_location||''} onChange={e=>update('production_location',e.target.value)} placeholder="Village, District, State" /></div>
                <div className="col-span-2"><label className="label">Field Notes</label><textarea className="input h-20 resize-none" value={form.field_notes||''} onChange={e=>update('field_notes',e.target.value)} /></div>
              </div>
            </div>
          )}

          {captureType === 'loom' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-indigo-900">Loom Details</h2>
              <p className="text-sm text-gray-500">Loom registration requires an artisan ID. Please register the artisan first, then return to document their loom.</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={handleCapture} disabled={loading} className="btn-primary">
              {loading ? 'Saving…' : '✓ Save Record'}
            </button>
            <button type="button" onClick={()=>{setCaptureType(null);setStep(0);setForm({});}} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
