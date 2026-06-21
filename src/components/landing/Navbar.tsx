'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#compliance', label: 'Compliance' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-border' : 'bg-transparent'
    )}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-9 h-9 rounded-full bg-indigo-deep flex items-center justify-center">
            <span className="font-mono font-semibold text-sm text-zari-bright">WP</span>
          </div>
          <div>
            <div className={cn('font-fraunces font-semibold text-lg leading-none transition-colors', scrolled ? 'text-ink' : 'text-white')}>Weft Passport</div>
            <div className={cn('text-[8.5px] tracking-[2px] uppercase transition-colors', scrolled ? 'text-muted' : 'text-white/60')}>Verified Provenance</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors no-underline',
                scrolled ? 'text-muted hover:text-ink hover:bg-paper' : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className={cn(
              'text-sm font-semibold px-4 py-2 rounded-full transition-colors no-underline',
              scrolled ? 'text-ink hover:text-indigo' : 'text-white/90 hover:text-white'
            )}
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="btn-primary text-sm"
          >
            Request Access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn('md:hidden p-2 rounded-lg', scrolled ? 'text-ink' : 'text-white')}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border px-6 pb-6">
          <div className="flex flex-col gap-1 pt-2">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="px-4 py-2.5 text-sm font-medium text-muted hover:text-ink hover:bg-paper rounded-lg no-underline" onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link href="/auth/login" className="btn-secondary text-center">Sign In</Link>
              <Link href="/auth/register" className="btn-primary text-center">Request Access</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
