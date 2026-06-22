import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weft Passport — Provenance Certification for Handwoven Textiles',
  description: 'Verify artisan-made claims at the loom level. Generate compliance-ready evidence for EU Green Claims, Digital Product Passports, and UK CMA enforcement.',
  keywords: 'provenance certification, handwoven textiles, artisan verification, ECGT compliance, digital product passport, supply chain transparency',
  openGraph: {
    title: 'Weft Passport',
    description: 'Provenance certification for South Asian handwoven textiles.',
    url: 'https://weft-passport.vercel.app',
    siteName: 'Weft Passport',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
