'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { generateArtisanCode, generateLoomCode, generateBatchCode } from '@/lib/utils'

export type Assignment = { coordinatorId: string; clusterId: string; clusterName: string }

const LOOM_TYPES = [
  { value: 'pit_loom', label: 'Pit Loom' },
  { value: 'frame_loom', label: 'Frame Loom' },
  { value: 'jacquard', label: 'Jacquard' },
  { value: 'dobby', label: 'Dobby' },
  { value: 'fly_shuttle', label: 'Fly Shuttle' },
  { value: 'handloom_other', label: 'Other Handloom' },
]
// Must match the textile_technique enum.
const TECHNIQUES = [
  { value: 'banarasi_silk', label: 'Banarasi Silk' },
  { value: 'jamdani', label: 'Jamdani' },
  { value: 'chanderi', label: 'Chanderi' },
  { value: 'ikat', label: 'Ikat' },
  { value: 'kantha', label: 'Kantha' },
  { value: 'block_print', label: 'Block Print' },
  { value: 'embroidery', label: 'Embroidery' },
  { value: 'other', label: 'Other' },
]

const input = 'w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]'
const label = 'block text-sm font-semibold text-[#1A1A2E] mb-1.5'

export default function CaptureWizard({ assignments }: { assignments: Assignment[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [assignmentId, setAssignmentId] = useState(assignments[0]?.coordinatorId ?? '')

  const [form, setForm] = useState({
    // artisan
    full_name: '', village: '', district: '', specialisation: '', years_experience: '',
    // loom
    loom_type: 'pit_loom', width_cm: '', age_years: '',
    // batch
    textile_name: '', technique: 'banarasi_silk', fibre_content: '', colour_palette: '', field_notes: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const steps = [
    { num: 1, title: 'Artisan Details', icon: '🧑‍🎨' },
    { num: 2, title: 'Loom & Technique', icon: '⚙️' },
    { num: 3, title: 'Batch Record', icon: '📋' },
  ]

  const assignment = assignments.find(a => a.coordinatorId === assignmentId) ?? assignments[0]

  const submit = async () => {
    if (!assignment) { setError('No cluster assignment found.'); return }
    if (!form.full_name.trim()) { setStep(1); setError('Artisan full name is required.'); return }
    if (!form.textile_name.trim()) { setStep(3); setError('Textile name is required.'); return }
    setSaving(true); setError('')

    const specArray = form.specialisation
      ? form.specialisation.split(',').map(s => s.trim()).filter(Boolean)
      : []

    // 1) Artisan (cluster + coordinator scoped for RLS)
    const { data: artisan, error: aErr } = await supabase.from('artisans').insert({
      artisan_id_code: generateArtisanCode(),
      cluster_id: assignment.clusterId,
      coordinator_id: assignment.coordinatorId,
      full_name: form.full_name.trim(),
      village: form.village.trim() || null,
      district: form.district.trim() || null,
      specialisation: specArray,
      years_experience: form.years_experience ? Number(form.years_experience) : null,
      verification_status: 'pending',
    }).select('id').single()
    if (aErr || !artisan) { setError(`Artisan: ${aErr?.message ?? 'failed'}`); setSaving(false); return }

    // 2) Loom (linked to the new artisan)
    const { data: loom, error: lErr } = await supabase.from('looms').insert({
      loom_id_code: generateLoomCode(),
      artisan_id: artisan.id,
      loom_type: form.loom_type,
      width_cm: form.width_cm ? Number(form.width_cm) : null,
      age_years: form.age_years ? Number(form.age_years) : null,
    }).select('id').single()
    if (lErr) { setError(`Loom: ${lErr.message}`); setSaving(false); return }

    // 3) Batch (field-captured -> submitted for certification)
    const { error: bErr } = await supabase.from('batches').insert({
      batch_id_code: generateBatchCode(),
      artisan_id: artisan.id,
      loom_id: loom?.id ?? null,
      coordinator_id: assignment.coordinatorId,
      cluster_id: assignment.clusterId,
      textile_name: form.textile_name.trim(),
      technique: form.technique,
      fibre_content: form.fibre_content.trim() || null,
      colour_palette: form.colour_palette.trim() || null,
      field_notes: form.field_notes.trim() || null,
      status: 'submitted',
    })
    if (bErr) { setError(`Batch: ${bErr.message}`); setSaving(false); return }

    router.push('/dashboard/batches')
    router.refresh()
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
      {assignments.length > 1 && (
        <div className="mb-5">
          <label className={label}>Cluster</label>
          <select className={input} value={assignmentId} onChange={e => setAssignmentId(e.target.value)}>
            {assignments.map(a => <option key={a.coordinatorId} value={a.coordinatorId}>{a.clusterName}</option>)}
          </select>
        </div>
      )}

      {/* Step progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2 flex-1 last:flex-none">
            <button type="button" onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                step === s.num ? 'bg-[#1B1464] text-white shadow-md'
                  : step > s.num ? 'bg-green-100 text-green-700'
                  : 'bg-[#FAF7F2] text-[#6B7280] border border-[#E5E0D8]'
              }`}>
              <span>{step > s.num ? '✓' : s.icon}</span>
              <span className="hidden sm:block">{s.title}</span>
            </button>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-[#E5E0D8]" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-bold text-[#1B1464] mb-1">Step 1 — Artisan Details</h2>
          <p className="text-[#6B7280] text-xs mb-3">Recording into <span className="font-semibold">{assignment?.clusterName}</span></p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={label}>Full Name *</label>
              <input className={input} value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Artisan full name" />
            </div>
            <div>
              <label className={label}>Village</label>
              <input className={input} value={form.village} onChange={e => set('village', e.target.value)} placeholder="Village" />
            </div>
            <div>
              <label className={label}>District</label>
              <input className={input} value={form.district} onChange={e => set('district', e.target.value)} placeholder="District" />
            </div>
            <div>
              <label className={label}>Specialisation</label>
              <input className={input} value={form.specialisation} onChange={e => set('specialisation', e.target.value)} placeholder="Banarasi Silk, Zari (comma-separated)" />
            </div>
            <div>
              <label className={label}>Years Experience</label>
              <input type="number" min="0" className={input} value={form.years_experience} onChange={e => set('years_experience', e.target.value)} placeholder="Years" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-bold text-[#1B1464] mb-4">Step 2 — Loom & Technique</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Loom Type</label>
              <select className={input} value={form.loom_type} onChange={e => set('loom_type', e.target.value)}>
                {LOOM_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Loom Width (cm)</label>
              <input type="number" min="0" className={input} value={form.width_cm} onChange={e => set('width_cm', e.target.value)} placeholder="e.g. 120" />
            </div>
            <div>
              <label className={label}>Loom Age (years)</label>
              <input type="number" min="0" className={input} value={form.age_years} onChange={e => set('age_years', e.target.value)} placeholder="e.g. 40" />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-bold text-[#1B1464] mb-4">Step 3 — Batch Record</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Textile Name *</label>
              <input className={input} value={form.textile_name} onChange={e => set('textile_name', e.target.value)} placeholder="e.g. Banarasi Silk Saree" />
            </div>
            <div>
              <label className={label}>Technique *</label>
              <select className={input} value={form.technique} onChange={e => set('technique', e.target.value)}>
                {TECHNIQUES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Fibre Content</label>
              <input className={input} value={form.fibre_content} onChange={e => set('fibre_content', e.target.value)} placeholder="e.g. 100% silk" />
            </div>
            <div>
              <label className={label}>Colour Palette</label>
              <input className={input} value={form.colour_palette} onChange={e => set('colour_palette', e.target.value)} placeholder="e.g. Crimson, Gold" />
            </div>
            <div className="col-span-2">
              <label className={label}>Field Notes</label>
              <textarea rows={2} className={`${input} resize-none`} value={form.field_notes} onChange={e => set('field_notes', e.target.value)} placeholder="Any site observations..." />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6 pt-4 border-t border-[#E5E0D8]">
        {step > 1 && (
          <button type="button" onClick={() => { setError(''); setStep(s => s - 1) }}
            className="flex-1 border border-[#E5E0D8] text-[#6B7280] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FAF7F2] transition-colors">
            ← Previous
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={() => { setError(''); setStep(s => s + 1) }}
            className="flex-1 bg-[#1B1464] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Next →
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={saving}
            className="flex-1 bg-[#F4A300] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4920A] transition-colors disabled:opacity-60">
            {saving ? 'Submitting…' : 'Submit for Certification'}
          </button>
        )}
      </div>
    </div>
  )
}
