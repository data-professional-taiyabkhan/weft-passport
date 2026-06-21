import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FRAMEWORKS = [
  {
    code: 'EU ECGT',
    name: 'Empowering Consumers for the Green Transition',
    status: 'active',
    deadline: '27 Sept 2026',
    description: 'Prohibits generic sustainability claims without third-party verified evidence. Fines up to 4% of annual turnover.',
    weftSupport: 'Full audit-ready evidence package for all sustainability and artisan-made claims.',
  },
  {
    code: 'EU CSDDD',
    name: 'Corporate Sustainability Due Diligence Directive',
    status: 'active',
    deadline: 'Phased from 2027',
    description: 'Extends due diligence to tier-1+ suppliers including artisan-level production networks.',
    weftSupport: 'Artisan registry and field verification data structured for supply chain due diligence reports.',
  },
  {
    code: 'EU DPP',
    name: 'Digital Product Passport (ESPR)',
    status: 'upcoming',
    deadline: 'Late 2026 / 2027',
    description: 'Textiles confirmed as priority category. QR/NFC access to manufacturing origin and traceability required.',
    weftSupport: 'QR-linked provenance pages directly satisfy DPP access and content requirements.',
  },
  {
    code: 'UK GCC',
    name: 'UK Green Claims Code (CMA)',
    status: 'active',
    deadline: 'Active enforcement now',
    description: 'CMA actively investigating unsupported sustainability claims across UK fashion sector.',
    weftSupport: 'Independent third-party field verification provides the substantiation required by CMA guidance.',
  },
];

const STATUS_CONFIG = {
  active:    { icon: CheckCircle, color: 'text-weft-moss', bg: 'bg-green-50', label: 'Active Enforcement' },
  upcoming:  { icon: Clock,       color: 'text-weft-gold', bg: 'bg-yellow-50', label: 'Coming Soon' },
  proposed:  { icon: AlertCircle, color: 'text-weft-terracotta', bg: 'bg-orange-50', label: 'Proposed' },
};

export default function ComplianceSection() {
  return (
    <section className="py-24 bg-white" id="compliance">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-weft-indigo font-semibold text-sm uppercase tracking-widest">Regulatory Alignment</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-weft-charcoal mt-3 mb-6">
              Built for the Compliance Landscape of 2026
            </h2>
            <p className="text-lg text-weft-muted leading-relaxed mb-6">
              Four major EU and UK regulatory frameworks are now active or entering enforcement.
              Weft Passport is the only provenance certification platform built specifically to
              satisfy their requirements for South Asian handloom textiles.
            </p>
            <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <p className="text-sm font-semibold text-red-700 mb-1">⚠️  27 September 2026 — ECGT Enforcement Begins</p>
              <p className="text-sm text-red-600">
                Brands cannot use terms like “handmade,” “artisan-crafted,” or “ethically sourced”
                without third-party verified evidence. Non-compliance fines: up to 4% annual turnover.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {FRAMEWORKS.map(({ code, name, status, deadline, description, weftSupport }) => {
              const { icon: Icon, color, bg, label } = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
              return (
                <div key={code} className="card border-l-4 border-l-weft-indigo">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-bold text-weft-indigo text-sm">{code}</span>
                      <p className="text-xs text-weft-muted">{name}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${bg}`}>
                      <Icon size={12} className={color} />
                      <span className={`text-xs font-medium ${color}`}>{label}</span>
                    </div>
                  </div>
                  <p className="text-xs text-weft-muted mb-2">{description}</p>
                  <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle size={14} className="text-weft-moss mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-weft-moss font-medium">{weftSupport}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
