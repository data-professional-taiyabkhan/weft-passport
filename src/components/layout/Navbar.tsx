'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-card' : 'bg-transparent'
    }`}>
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-weft-indigo flex items-center justify-center shadow-heritage">
              <span className="text-white font-serif font-bold text-lg">W</span>
            </div>
            <div>
              <span className="font-serif font-semibold text-weft-indigo text-xl">Weft Passport</span>
              <p className="text-xs text-weft-muted hidden sm:block">Loom-to-Label Certification</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/#how-it-works" className="text-sm font-medium text-weft-charcoal hover:text-weft-indigo transition-colors">How It Works</Link>
            <Link href="/#features" className="text-sm font-medium text-weft-charcoal hover:text-weft-indigo transition-colors">Features</Link>
            <Link href="/#compliance" className="text-sm font-medium text-weft-charcoal hover:text-weft-indigo transition-colors">Compliance</Link>
            <Link href="/#pricing" className="text-sm font-medium text-weft-charcoal hover:text-weft-indigo transition-colors">Pricing</Link>
            <Link href="/about" className="text-sm font-medium text-weft-charcoal hover:text-weft-indigo transition-colors">About</Link>
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
            <Link href="/signup" className="btn-primary text-sm py-2.5">
              Request Access
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-weft-charcoal">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-weft-sand py-4 space-y-2">
            {['How It Works', 'Features', 'Compliance', 'Pricing', 'About'].map(item => (
              <Link key={item} href={`/#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-2 text-sm font-medium text-weft-charcoal hover:text-weft-indigo"
                onClick={() => setOpen(false)}>
                {item}
              </Link>
            ))}
            <div className="pt-2 px-4 flex flex-col gap-2">
              <Link href="/login" className="btn-secondary text-center text-sm">Sign In</Link>
              <Link href="/signup" className="btn-primary text-center text-sm">Request Access</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
