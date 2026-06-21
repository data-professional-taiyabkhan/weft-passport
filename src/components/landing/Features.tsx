import { ShieldCheck, BarChart3, QrCode, FileText, Users, MapPin, Layers, Lock } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Artisan-Level Verification',
      desc: 'Every certified batch is linked to a named artisan, specific loom, and production event — not just a supplier or factory.',
      color: 'text-sage bg-sage-soft',
    },
    {
      icon: Layers,
      title: 'SKU-to-Batch Mapping',
      desc: 'Map certified batches to individual product SKUs with partial attribution support. One batch can span multiple products.',
      color: 'text-indigo bg-indigo-soft',
    },
    {
      icon: QrCode,
      title: 'QR Provenance Pages',
      desc: 'Auto-generate QR codes for each SKU linking to public consumer provenance pages with artisan story, loom data, and certification badge.',
      color: 'text-zari bg-zari-soft',
    },
    {
      icon: FileText,
      title: 'Compliance Pack Export',
      desc: 'Export structured documentation for EU ECGT, CSDDD, Digital Product Passport, and UK Green Claims Code with a single click.',
      color: 'text-madder bg-madder/10',
    },
    {
      icon: MapPin,
      title: 'Geo-Tagged Evidence',
      desc: 'Field records include GPS coordinates, timestamped photos, and community co-signatures — creating field-truth rather than supplier declarations.',
      color: 'text-amber bg-amber-soft',
    },
    {
      icon: Users,
      title: 'Cooperative Co-Verification',
      desc: 'Weaver cooperatives co-sign production batches, adding a trusted community verification layer to each certification.',
      color: 'text-sage bg-sage-soft',
    },
    {
      icon: BarChart3,
      title: 'Brand Analytics',
      desc: 'Track QR scan rates, consumer engagement, compliance coverage, and provenance page performance from your dashboard.',
      color: 'text-indigo bg-indigo-soft',
    },
    {
      icon: Lock,
      title: 'Offline Field Capture',
      desc: 'Field coordinators capture data in remote weaving communities without reliable internet. Records sync when connectivity is restored.',
      color: 'text-zari bg-zari-soft',
    },
  ]

  return (
    <section id="features" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="label-mono text-zari mb-4">Platform Features</div>
          <h2 className="heading-serif text-4xl text-ink mb-5">
            Everything your brand needs for credible provenance
          </h2>
          <p className="text-muted text-lg">
            Built specifically for South Asian handloom textiles — not a generic supply chain tool retrofitted for the sector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card-hover p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-base text-ink mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
