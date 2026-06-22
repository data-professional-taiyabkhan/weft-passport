'use client'

import { useState } from 'react'

export default function QRCodesPage() {
  const [passportId, setPassportId] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const generateQR = () => {
    if (!passportId.trim()) return
    const passportUrl = `${appUrl}/passport/${passportId.trim()}`
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(passportUrl)}&margin=10&color=1B1464`
    setQrUrl(qr)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">QR Code Generator</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Generate scannable QR codes that link to a product's public passport page</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 mb-6">
        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Batch ID or Batch Code</label>
        <div className="flex gap-3">
          <input
            value={passportId}
            onChange={e => setPassportId(e.target.value)}
            placeholder="e.g. WP-BTH-2025-1234 or UUID"
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
          />
          <button onClick={generateQR}
            className="bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Generate
          </button>
        </div>
        <p className="text-[#9CA3AF] text-xs mt-2">Only certified batches will show a passport page when scanned.</p>
      </div>

      {qrUrl && (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 flex flex-col items-center gap-4">
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-lg border border-[#E5E0D8]" />
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Scan to view passport</p>
            <p className="text-[#6B7280] text-xs font-mono break-all">{appUrl}/passport/{passportId}</p>
          </div>
          <div className="flex gap-3">
            <a href={qrUrl} download={`weft-passport-qr-${passportId}.png`}
              className="bg-[#F4A300] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4920A] transition-colors">
              Download PNG
            </a>
            <button onClick={() => navigator.clipboard.writeText(`${appUrl}/passport/${passportId}`)}
              className="border border-[#E5E0D8] text-[#1B1464] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FAF7F2] transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-[#1B1464]/5 border border-[#1B1464]/15 rounded-xl px-5 py-4">
        <p className="text-[#1B1464] text-xs font-semibold uppercase tracking-wide mb-1">How it works</p>
        <ol className="space-y-1">
          {[
            'Enter the Batch ID or Batch Code of a certified batch',
            'Click Generate — a unique QR code is created',
            'Download and print it on your product label or swing tag',
            'Consumers scan it to see the full artisan story and origin certificate',
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
