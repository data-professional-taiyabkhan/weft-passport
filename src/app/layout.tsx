import type { Metadata } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Weft Passport — Verified Heritage Textile Provenance',
  description:
    'SKU-level artisan traceability for South Asian handwoven textiles. Connecting master weavers to fashion markets with verified loom-to-label provenance.',
  keywords: 'textile provenance, handloom certification, artisan traceability, ethical fashion, Banarasi, South Asian textiles',
  openGraph: {
    title: 'Weft Passport',
    description: 'Verified Heritage Textile Provenance',
    url: 'https://weftpassport.com',
    siteName: 'Weft Passport',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="font-inter bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
