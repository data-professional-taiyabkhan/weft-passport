export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Field Capture',
      desc: 'Our field coordinators visit artisan communities in Varanasi and other clusters. They register individual artisans, document looms, and capture geo-tagged production evidence using the Weft Passport field app — online or offline.',
      tags: ['Artisan Registry', 'Loom Documentation', 'Geo-tagged Photos', 'Cooperative Co-sign'],
    },
    {
      num: '02',
      title: 'Batch Certification',
      desc: 'Each textile batch is linked to a specific artisan, loom, and production event. The Weft Passport team verifies and certifies the batch, generating a unique certification reference and immutable provenance record.',
      tags: ['SKU-level Matching', 'Certification Ref', 'Audit Trail', 'Quality Verification'],
    },
    {
      num: '03',
      title: 'Brand Dashboard',
      desc: 'Brands access a self-service dashboard to manage certified batches, map them to product SKUs, generate QR codes, and export compliance documentation structured for EU and UK regulatory frameworks.',
      tags: ['SKU Mapping', 'QR Generation', 'Compliance Export', 'Analytics'],
    },
    {
      num: '04',
      title: 'Consumer Transparency',
      desc: 'Each certified garment carries a QR code linking to a public provenance page showing the artisan’s story, loom details, cooperative verification, and certification badge — turning authenticity into a commercial asset.',
      tags: ['Artisan Story', 'Loom Details', 'Certificate Badge', 'Scan Analytics'],
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-indigo-deep overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, #dcb24c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c2932f 0%, transparent 50%)`
      }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-2xl mb-16">
          <div className="label-mono text-zari mb-4">How It Works</div>
          <h2 className="heading-serif text-4xl text-white mb-5">
            From loom to label — every thread traced
          </h2>
          <p className="text-white/60 text-lg">
            A four-step process that transforms informal artisan production into audit-ready, compliance-structured provenance data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
              )}
              <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-6 h-full">
                <div className="font-mono font-semibold text-4xl text-zari/40 mb-4">{step.num}</div>
                <h3 className="font-fraunces font-semibold text-xl text-white mb-3">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{step.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/[0.08] text-white/60 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
