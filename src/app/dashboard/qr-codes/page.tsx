'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Batch {
  id: string
  batch_id_code: string
  textile_name: string
  status: string
  provenance_page_slug: string | null
}

export default function QRCodesPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [selectedBatch, setSelectedBatch] = useState<string>('')
  const [qrUrl, setQrUrl] = useState('')
  const [passportUrl, setPassportUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => {
    async function loadBatches() {
      const supabase = createClient()
      const { data } = await supabase
        .from('batches')
        .select('id, batch_id_code, textile_name, status, provenance_page_slug')
        .in('status', ['certified', 'field_verified'])
        .order('certified_at', { ascending: false })
      setBatches(data || [])
      setLoading(false)
    }
    loadBatches()
  }, [])

  const generateQR = (batchId: string) => {
    const batch = batches.find(b => b.id === batchId)
    if (!batch) return
    const slug = batch.provenance_page_slug || batch.id
    const url = `${appUrl}/passport/${slug}`
    setPassportUrl(url)
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&margin=12&color=1B1464`)
    setSelectedBatch(batchId)
  }

  const certifiedBatches = batches.filter(b => b.status === 'certified')
  const pendingBatches = batches.filter(b => b.status === 'field_verified')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">QR Code Generator</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Generate scannable QR codes that link to a product&apos;s public provenance passport</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch list */}
        <div>
          <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#E5E0D8] bg-[#FAF7F2]">
              <h2 className="text-sm font-bold text-[#1B1464] uppercase tracking-wide">Certified Batches ({certifiedBatches.length})</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Click to generate QR code</p>
            </div>
            {loading ? (
              <div className="p-6 text-center text-[#6B7280] text-sm">Loading batches...</div>
            ) : certifiedBatches.length === 0 ? (
              <div className="p-6 text-center text-[#6B7280] text-sm">No certified batches yet</div>
            ) : (
              <div className="divide-y divide-[#E5E0D8]">
                {certifiedBatches.map(batch => (
                  <button
                    key={batch.id}
                    onClick={() => generateQR(batch.id)}
                    className={`w-full text-left px-5 py-3.5 hover:bg-[#FAF7F2] transition-colors flex items-center justify-between ${
                      selectedBatch === batch.id ? 'bg-[#1B1464]/5 border-l-4 border-[#1B1464]' : ''
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A2E]">{batch.textile_name}</p>
                      <p className="text-xs font-mono text-[#6B7280] mt-0.5">{batch.batch_id_code}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">Certified</span>
                      <span className="text-[#1B1464] text-lg">→</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {pendingBatches.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden mt-4">
              <div className="px-5 py-3 border-b border-[#E5E0D8]">
                <h3 className="text-xs font-bold text-[#F4A300] uppercase tracking-wide">Awaiting Certification ({pendingBatches.length})</h3>
              </div>
              <div className="divide-y divide-[#E5E0D8]">
                {pendingBatches.map(batch => (
                  <div key={batch.id} className="px-5 py-3 opacity-60">
                    <p className="text-sm text-[#1A1A2E]">{batch.textile_name}</p>
                    <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">{batch.batch_id_code}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* QR Display */}
        <div>
          {qrUrl ? (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 flex flex-col items-center gap-5">
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1B1464] mb-0.5">
                  {batches.find(b => b.id === selectedBatch)?.textile_name}
                </p>
                <p className="text-xs font-mono text-[#6B7280]">
                  {batches.find(b => b.id === selectedBatch)?.batch_id_code}
                </p>
              </div>

              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrUrl} alt="QR Code" className="w-56 h-56 rounded-xl border-2 border-[#E5E0D8] shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-[#1B1464] text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
                  WP
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Scan to view provenance passport</p>
                <p className="text-[#6B7280] text-xs font-mono break-all max-w-xs">{passportUrl}</p>
              </div>

              <div className="flex gap-3 w-full">
                <a href={qrUrl} download={`weft-passport-qr-${batches.find(b => b.id === selectedBatch)?.batch_id_code}.png`}
                  className="flex-1 bg-[#F4A300] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4920A] transition-colors text-center">
                  Download PNG
                </a>
                <button onClick={() => navigator.clipboard.writeText(passportUrl)}
                  className="flex-1 border border-[#E5E0D8] text-[#1B1464] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FAF7F2] transition-colors">
                  Copy Link
                </button>
              </div>

              <a href={passportUrl} target="_blank" rel="noopener noreferrer"
                className="w-full border border-[#1B1464] text-[#1B1464] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1B1464] hover:text-white transition-colors text-center">
                Preview Passport Page →
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#1B1464]/10 flex items-center justify-center text-3xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">Select a batch to generate QR</h3>
              <p className="text-[#6B7280] text-sm max-w-xs">Choose a certified batch from the list. The QR code links to the product&apos;s public provenance passport that consumers can scan.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-[#1B1464]/5 border border-[#1B1464]/15 rounded-xl px-5 py-4">
        <p className="text-[#1B1464] text-xs font-semibold uppercase tracking-wide mb-1">How it works</p>
        <ol className="space-y-1">
          {[
            'Select a certified batch from the list — only certified batches can generate QR codes',
            'Download the QR code and print it on your product label, swing tag, or packaging',
            'Consumers scan it with their phone camera to see the artisan story, origin, and certification',
            'Each scan is tracked — see analytics on your dashboard',
          ].map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#1A1A2E]">
              <span className="text-[#F4A300] font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
