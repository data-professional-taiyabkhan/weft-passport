import { CheckCircle2, Calendar } from 'lucide-react'

export function Compliance() {
  const frameworks = [
    {
      code: 'ECGT',
      name: 'EU Empowering Consumers for the Green Transition',
      deadline: 'Enforces 27 Sep 2026',
      urgent: true,
      points: [
        'Prohibits vague claims like ‘eco-friendly’ or ‘sustainable’ without verification',
        'Requires third-party certified sustainability labels',
        'Fines up to 4% of annual turnover per member state',
        'Weft Passport provides the artisan-verified evidence layer',
      ],
    },
    {
      code: 'CSDDD',
      name: 'EU Corporate Sustainability Due Diligence Directive',
      deadline: 'Phased from 2027',
      urgent: false,
      points: [
        'Extends due diligence beyond tier-one suppliers',
        'Requires documented evidence of production chain conditions',
        'Weft Passport artisan records serve as tier-2/3 documentation',
        'Structured export format aligned with directive requirements',
      ],
    },
    {
      code: 'DPP',
      name: 'Digital Product Passport (ESPR)',
      deadline: 'Textiles: late 2026/early 2027',
      urgent: false,
      points: [
        'Textiles confirmed as priority category under ESPR',
        'Requires manufacturing origin, traceability identifiers, QR/NFC access',
        'Weft Passport already producing DPP-compatible data fields',
        'QR provenance pages are DPP-ready consumer access layer',
      ],
    },
    {
      code: 'UK GCC',
      name: 'UK Green Claims Code (CMA)',
      deadline: 'Active enforcement now',
      urgent: true,
      points: [
        'CMA actively investigating unsupported fashion sustainability claims',
        'Requires verifiable, accurate, and complete evidence for all claims',
        'Weft Passport certification provides the verification infrastructure',
        'Audit-ready documentation for CMA enquiry response',
      ],
    },
  ]

  return (
    <section id="compliance" className="py-24 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="label-mono text-zari mb-4">Regulatory Compliance</div>
          <h2 className="heading-serif text-4xl text-ink mb-5">
            Built for the regulatory moment that’s already here
          </h2>
          <p className="text-muted text-lg">
            Weft Passport is aligned with all major UK and EU textile provenance frameworks — structured for compliance, not retrofitted after enforcement begins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {frameworks.map(({ code, name, deadline, urgent, points }) => (
            <div key={code} className={`card p-6 ${urgent ? 'border-zari/30 bg-zari-soft/30' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-mono font-semibold text-base text-indigo">{code}</div>
                  <div className="text-sm text-muted mt-1 leading-tight max-w-xs">{name}</div>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  urgent ? 'bg-madder/10 text-madder' : 'bg-indigo-soft text-indigo'
                }`}>
                  <Calendar size={11} />
                  {deadline}
                </div>
              </div>
              <ul className="space-y-2">
                {points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle2 size={14} className="text-sage mt-0.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
