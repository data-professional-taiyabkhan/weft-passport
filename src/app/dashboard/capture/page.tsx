'use client'
import { useState } from 'react'

export default function FieldCapturePage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const steps = [
    { num: 1, title: 'Artisan Details', icon: '🧑‍🎨' },
    { num: 2, title: 'Loom & Technique', icon: '⚙️' },
    { num: 3, title: 'Batch Record', icon: '📋' },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Field Data Capture</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Record artisan, loom, and batch data on-site</p>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <>
            <button key={s.num} onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                step === s.num
                  ? 'bg-[#1B1464] text-white shadow-md'
                  : step > s.num
                  ? 'bg-green-100 text-green-700'
                  : 'bg-[#FAF7F2] text-[#6B7280] border border-[#E5E0D8]'
              }`}>
              <span>{step > s.num ? '✓' : s.icon}</span>
              <span className="hidden sm:block">{s.title}</span>
            </button>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-[#E5E0D8]" />}
          </>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-[#1B1464] mb-4">Step 1 — Artisan Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Full Name *</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="Artisan full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Village</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="Village" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">District</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="District" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Specialisation</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. Banarasi Silk" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Years Experience</label>
                <input type="number" className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="Years" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Photo (optional)</label>
                <div className="border-2 border-dashed border-[#E5E0D8] rounded-xl p-6 text-center">
                  <p className="text-[#6B7280] text-sm">📷 Tap to take photo or upload</p>
                  <p className="text-[#9CA3AF] text-xs mt-1">Photo upload coming in Phase 2</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-[#1B1464] mb-4">Step 2 — Loom & Technique</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Loom Type</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]">
                  <option>Pit Loom</option>
                  <option>Frame Loom</option>
                  <option>Jacquard Loom</option>
                  <option>Draw Loom</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Weave Method</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]">
                  <option>Handloom</option>
                  <option>Semi Handloom</option>
                  <option>Hand Embroidery</option>
                  <option>Block Print</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Loom Width (cm)</label>
                <input type="number" className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. 120" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Loom Age (years)</label>
                <input type="number" className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. 40" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-[#1B1464] mb-4">Step 3 — Batch Record</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Textile Type *</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]">
                  <option>Banarasi Silk</option>
                  <option>Chanderi</option>
                  <option>Kanjivaram</option>
                  <option>Pashmina</option>
                  <option>Khadi</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Fibre Content</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. 100% silk" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Colour</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. Crimson" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Pattern Name</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" placeholder="e.g. Butidar" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Field Notes</label>
                <textarea rows={2} className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464] resize-none" placeholder="Any site observations..." />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6 pt-4 border-t border-[#E5E0D8]">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 border border-[#E5E0D8] text-[#6B7280] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FAF7F2] transition-colors">
              ← Previous
            </button>
          )}
          {step < totalSteps ? (
            <button onClick={() => setStep(s => s + 1)}
              className="flex-1 bg-[#1B1464] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
              Next →
            </button>
          ) : (
            <button
              className="flex-1 bg-[#F4A300] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4920A] transition-colors">
              Submit for Certification
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
