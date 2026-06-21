'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'full' | 'mark' | 'sidebar'
  className?: string
  href?: string
}

export function Logo({ variant = 'full', className, href = '/' }: LogoProps) {
  const content = (
    <>
      {variant === 'mark' && (
        <div className={cn(
          'w-9 h-9 rounded-full border-[1.5px] border-zari-bright bg-zari/10',
          'flex items-center justify-center',
          'font-mono font-semibold text-sm text-zari-bright',
          className
        )}>
          WP
        </div>
      )}
      {variant === 'sidebar' && (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full border-[1.5px] border-zari-bright bg-zari/10 flex items-center justify-center font-mono font-semibold text-sm text-zari-bright">
            WP
          </div>
          <div>
            <b className="font-fraunces font-semibold text-base text-white leading-none">Weft Passport</b>
            <small className="block text-[9.5px] tracking-[1.6px] uppercase text-[#9fabce] mt-0.5">Verified Provenance</small>
          </div>
        </div>
      )}
      {variant === 'full' && (
        <div className={cn('flex items-center gap-3', className)}>
          <Image
            src="/logo.png"
            alt="Weft Passport"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <div>
            <div className="font-fraunces font-semibold text-xl text-ink leading-none">Weft Passport</div>
            <div className="text-[9px] tracking-[2px] uppercase text-muted mt-0.5">Verified Heritage Textile Provenance</div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  )
}
