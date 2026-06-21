import {
  BarChart3, QrCode, FileText, Globe, Users, Shield,
  Smartphone, Zap, Lock, TrendingUp, MapPin, Layers
} from 'lucide-react';

const FEATURES = [
  { icon: Users,      title: 'Artisan Registry',        desc: 'Verified profiles for every weaver — name, loom, location, specialisation, and production history.', tag: 'Core' },
  { icon: Layers,     title: 'Batch Certification',      desc: 'Each textile batch gets a unique ID linking artisan, loom, and production event to a specific SKU.', tag: 'Core' },
  { icon: QrCode,     title: 'QR Provenance Pages',      desc: 'Auto-generated consumer pages showing the full story behind every certified product.', tag: 'Consumer' },
  { icon: BarChart3,  title: 'Brand Dashboard',          desc: 'Manage your batches, SKUs, compliance exports, and analytics from one clean interface.', tag: 'Brand' },
  { icon: FileText,   title: 'Compliance Documents',     desc: 'Audit-ready PDFs structured for EU ECGT, CSDDD, Digital Product Passport, and UK Green Claims.', tag: 'Compliance' },
  { icon: Smartphone, title: 'Field Capture App',        desc: 'Offline-capable mobile interface for coordinators to capture artisan data directly in weaving villages.', tag: 'Field' },
  { icon: MapPin,     title: 'Geo-tagged Evidence',      desc: 'GPS coordinates and timestamped photos at every production event for irrefutable location proof.', tag: 'Verification' },
  { icon: TrendingUp, title: 'Analytics & Insights',     desc: 'Track QR scan volumes, consumer engagement, compliance scores and price uplift data.', tag: 'Analytics' },
  { icon: Globe,      title: 'Multi-cluster Support',    desc: 'Varanasi, Murshidabad, Chanderi — scale across artisan clusters as your catalogue grows.', tag: 'Scale' },
  { icon: Shield,     title: 'Regulatory Monitoring',    desc: 'Stay ahead of EU/UK enforcement timelines with built-in framework alignment checks.', tag: 'Compliance' },
  { icon: Zap,        title: 'Instant QR Generation',    desc: 'Generate and embed certified QR codes into labels at the click of a button.', tag: 'Automation' },
  { icon: Lock,       title: 'Immutable Audit Trail',    desc: 'Every verification event is timestamped and locked — tamper-proof records for regulatory submission.', tag: 'Trust' },
];

const TAG_COLORS: Record<string, string> = {
  Core:         'bg-weft-indigo bg-opacity-10 text-weft-indigo',
  Consumer:     'bg-weft-moss bg-opacity-10 text-weft-moss',
  Brand:        'bg-purple-100 text-purple-700',
  Compliance:   'bg-red-50 text-red-600',
  Field:        'bg-orange-100 text-orange-700',
  Verification: 'bg-weft-gold bg-opacity-10 text-weft-gold',
  Analytics:    'bg-blue-50 text-blue-600',
  Scale:        'bg-teal-50 text-teal-600',
  Automation:   'bg-pink-50 text-pink-600',
  Trust:        'bg-weft-terracotta bg-opacity-10 text-weft-terracotta',
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-weft-ivory" id="features">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-weft-terracotta font-semibold text-sm uppercase tracking-widest">Platform Features</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-weft-charcoal mt-3 mb-6">
            Everything You Need to Certify with Confidence
          </h2>
          <p className="text-lg text-weft-muted">
            Purpose-built for the unique reality of South Asian artisan production — not a generic supply chain tool.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
            <div key={title} className="card hover:shadow-heritage hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-weft-sand flex items-center justify-center group-hover:bg-weft-indigo transition-colors duration-300">
                  <Icon size={20} className="text-weft-indigo group-hover:text-white transition-colors duration-300" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600'}`}>
                  {tag}
                </span>
              </div>
              <h3 className="font-semibold text-weft-charcoal mb-2">{title}</h3>
              <p className="text-sm text-weft-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
