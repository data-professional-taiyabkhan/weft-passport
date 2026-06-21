import { MapPin, Database, QrCode, FileCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: MapPin,
    color: 'text-weft-terracotta',
    bg: 'bg-weft-terracotta',
    title: 'Field Verification',
    description: 'Our embedded coordinators visit artisan households in Varanasi and other clusters. They capture loom details, artisan identity, production evidence, and geo-tagged photos.',
    tags: ['Artisan ID', 'Loom Registration', 'Geo-tagged Photos'],
  },
  {
    step: '02',
    icon: Database,
    color: 'text-weft-indigo',
    bg: 'bg-weft-indigo',
    title: 'Batch Certification',
    description: 'Each textile batch is recorded against a verified artisan and loom, creating a unique batch ID. The data is structured for UK and EU compliance frameworks.',
    tags: ['Batch ID Code', 'SKU Mapping', 'Compliance Structuring'],
  },
  {
    step: '03',
    icon: QrCode,
    color: 'text-weft-moss',
    bg: 'bg-weft-moss',
    title: 'QR Provenance Page',
    description: 'Each certified product receives a unique QR code linking to a consumer-facing provenance page showing who made it, where, and the cultural context behind the craft.',
    tags: ['QR Code', 'Consumer Story', 'Live Scan Analytics'],
  },
  {
    step: '04',
    icon: FileCheck,
    color: 'text-weft-gold',
    bg: 'bg-weft-gold',
    title: 'Compliance Export',
    description: 'Brands download audit-ready documentation structured for the EU Green Claims Directive, CSDDD, Digital Product Passport, and UK Green Claims Code.',
    tags: ['PDF Reports', 'Regulatory Audit Trail', 'Auto-updated'],
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-weft-indigo font-semibold text-sm uppercase tracking-widest">The Process</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-weft-charcoal mt-3 mb-6">
            From Loom to Label in 4 Steps
          </h2>
          <p className="text-lg text-weft-muted leading-relaxed">
            A field-embedded, technology-powered process that converts informal artisan production
            into structured, auditable, commercially-usable provenance data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-16 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-weft-terracotta via-weft-indigo via-weft-moss to-weft-gold opacity-30" />

          {STEPS.map(({ step, icon: Icon, color, bg, title, description, tags }, i) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className={`w-16 h-16 rounded-2xl ${bg} bg-opacity-10 border-2 border-current ${color} flex items-center justify-center mb-4 relative z-10`}>
                <Icon size={28} className={color} />
              </div>
              <div className={`text-xs font-bold ${color} mb-2 tracking-widest`}>{step}</div>
              <h3 className="font-semibold text-weft-charcoal text-lg mb-3">{title}</h3>
              <p className="text-sm text-weft-muted leading-relaxed mb-4">{description}</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-weft-sand text-weft-silk text-xs rounded-full">{tag}</span>
                ))}
              </div>

              {/* Arrow between steps */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-14 z-20">
                  <ArrowRight size={20} className="text-weft-muted" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
