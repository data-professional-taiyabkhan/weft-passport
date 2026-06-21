import Link from 'next/link';
import { Mail, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-weft-charcoal text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-weft-indigo flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">W</span>
              </div>
              <div>
                <span className="font-serif font-semibold text-xl">Weft Passport</span>
                <p className="text-xs text-gray-400">Silk and Soil Ltd, Sheffield, UK</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Certifying South Asian handwoven textiles at the artisan, loom, and SKU level.
              Verified. Compliant. Connected.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="mailto:hello@weftpassport.com" className="w-9 h-9 rounded-lg bg-white bg-opacity-10 flex items-center justify-center hover:bg-weft-indigo transition-colors">
                <Mail size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white bg-opacity-10 flex items-center justify-center hover:bg-weft-indigo transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white bg-opacity-10 flex items-center justify-center hover:bg-weft-indigo transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Platform</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Features',     href: '/#features' },
                { label: 'Compliance',   href: '/#compliance' },
                { label: 'Pricing',      href: '/#pricing' },
                { label: 'Brand Login',  href: '/login' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Company</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'About',        href: '/about' },
                { label: 'Impact',       href: '/impact' },
                { label: 'Artisans',     href: '/artisans' },
                { label: 'Privacy',      href: '/privacy' },
                { label: 'Terms',        href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Silk and Soil Ltd. All rights reserved. Company registered in England & Wales.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-weft-moss animate-pulse" />
            <span className="text-xs text-gray-400">Platform live — accepting pilot applications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
