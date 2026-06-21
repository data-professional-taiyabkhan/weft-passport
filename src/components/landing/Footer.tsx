import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-ink text-white/50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full border border-zari-bright/50 flex items-center justify-center font-mono font-semibold text-sm text-zari-bright">
                WP
              </div>
              <div>
                <div className="font-fraunces font-semibold text-base text-white">Weft Passport</div>
                <div className="text-[9px] tracking-[2px] uppercase text-white/30 mt-0.5">Verified Heritage Textile Provenance</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Certifying South Asian handwoven textiles at the SKU level. Operated by Silk and Soil Ltd, Sheffield, UK.
            </p>
            <p className="text-xs mt-4">© 2025 Silk and Soil Ltd. All rights reserved.</p>
          </div>

          <div>
            <div className="label-mono text-white/30 text-[9px] mb-4">Platform</div>
            <ul className="space-y-2.5">
              {['How It Works', 'Features', 'Compliance', 'Pricing'].map(l => (
                <li key={l}><Link href={`#${l.toLowerCase().replace(/ /g,'-')}`} className="text-sm hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label-mono text-white/30 text-[9px] mb-4">Company</div>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>UK Companies House registration pending. Platform operated by Silk and Soil Ltd.</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>ECGT Directive — Active monitoring</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
