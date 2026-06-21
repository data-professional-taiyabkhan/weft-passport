import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Weft Passport — Loom-to-Label Provenance Certification',
    template: '%s | Weft Passport',
  },
  description:
    'Weft Passport certifies South Asian handwoven textiles at the SKU level, connecting master weavers to fashion markets with verified loom-to-label provenance. Compliance-ready for EU Green Claims, CSDDD & Digital Product Passport.',
  keywords: [
    'handwoven textile certification', 'provenance platform', 'artisan traceability',
    'EU Green Claims compliance', 'Banarasi silk verified', 'ethical fashion',
    'supply chain transparency', 'Digital Product Passport', 'South Asian textiles',
  ],
  authors: [{ name: 'Weft Passport — Silk and Soil Ltd' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://weftpassport.com',
    siteName: 'Weft Passport',
    title: 'Weft Passport — Loom-to-Label Provenance Certification',
    description: 'Certifying South Asian handwoven textiles at the artisan, loom, and SKU level.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weft Passport — Loom-to-Label Provenance Certification',
    description: 'Certifying South Asian handwoven textiles at the artisan, loom, and SKU level.',
  },
  robots: { index: true, follow: true },
  themeColor: '#2D4A7A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
