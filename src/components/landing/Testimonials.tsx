export function Testimonials() {
  const testimonials = [
    {
      quote: 'Weft Passport is the infrastructure we’ve been waiting for. We’ve been making artisan-made claims for years — now we can actually prove them.',
      name: 'UK Ethical Brand',
      role: 'Premium womenswear, London',
      tier: 'Letter of Intent',
    },
    {
      quote: 'The ECGT enforcement deadline is real. Weft Passport is the only platform I’ve found that produces evidence at the level regulators actually require.',
      name: 'EU Sustainable Brand',
      role: 'Amsterdam-based fashion label',
      tier: 'Letter of Intent',
    },
    {
      quote: 'Our customers scan the QR codes. Seeing the actual weaver who made their garment changes how they talk about our products. It’s authentic storytelling.',
      name: 'Silk & Soil (Pilot)',
      role: 'Ethical fashion label, Sheffield',
      tier: 'Live Pilot',
    },
  ]

  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <div className="label-mono text-zari mb-4">Early Validation</div>
          <h2 className="heading-serif text-4xl text-ink">
            Trusted by brands who care about proof
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6">
              <div className="text-zari text-4xl font-fraunces leading-none mb-4">“</div>
              <p className="text-muted text-sm leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="font-semibold text-sm text-ink">{t.name}</div>
                  <div className="text-xs text-muted-soft mt-0.5">{t.role}</div>
                </div>
                <span className="text-xs bg-zari-soft text-zari px-2.5 py-1 rounded-full font-mono font-semibold">{t.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
