'use client';
import { useState } from 'react';
import Link from 'next/link';

const FRAMEWORKS = [
  { id: 'ECGT', name: 'EU Green Claims (ECGT)', description: 'Substantiated green claims documentation' },
  { id: 'DPP', name: 'Digital Product Passport', description: 'ESPR-ready product data export' },
  { id: 'CSDDD', name: 'CSDDD Due Diligence', description: 'Supply chain due diligence report' },
  { id: 'UK_GREEN', name: 'UK Green Claims Code', description: 'CMA-compliant claims evidence pack' },
];

export default function ComplianceExportPage() {
  const [selected, setSelected] = useState('ECGT');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    // Placeholder — will call API route once PDF generation is wired up
    await new Promise(r => setTimeout(r, 1500));
    setGenerating(false);
    setDone(true);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/compliance" className="text-sm text-gray-400 hover:text-indigo-600 mb-2 inline-flex items-center gap-1">← Back to Compliance</Link>
        <h1 className="text-3xl font-serif text-indigo-900">Export Compliance Report</h1>
        <p className="text-gray-500 text-sm mt-1">Generate a downloadable report for your chosen regulatory framework</p>
      </div>

      <div className="card mb-6">
        <h2 className="font-semibold text-indigo-900 mb-4">Select Framework</h2>
        <div className="space-y-3">
          {FRAMEWORKS.map(fw => (
            <label key={fw.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selected === fw.id ? 'border-indigo-400 bg-indigo-50' : 'border-weft-border hover:border-indigo-200'
            }`}>
              <input type="radio" name="framework" value={fw.id} checked={selected === fw.id} onChange={() => setSelected(fw.id)} className="mt-0.5" />
              <div>
                <p className="font-medium text-sm text-weft-charcoal">{fw.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{fw.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {done ? (
        <div className="card bg-green-50 border-green-200 text-center py-8">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-green-800">Report generated successfully</p>
          <p className="text-green-600 text-sm mt-1">Your compliance export is ready. Check your email or the documents tab.</p>
          <Link href="/dashboard/compliance" className="btn-primary mt-4 inline-flex">Back to Compliance Centre</Link>
        </div>
      ) : (
        <button type="button" onClick={handleGenerate} disabled={generating} className="btn-primary">
          {generating ? 'Generating…' : `Generate ${selected} Report`}
        </button>
      )}
    </div>
  );
}
