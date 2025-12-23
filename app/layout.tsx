import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calcolatore ROI AI | Rayo Consulting - Automatizza e Risparmia',
  description: 'Calcola in 2 minuti quanto costa alla tua azienda la mancanza di automazione AI. Analisi personalizzata su stipendi e mancati ricavi.',
  applicationName: 'Rayo Consulting ROI Calculator',
  authors: [{ name: 'Dylan Patriarchi', url: 'https://rayo.consulting' }],
  generator: 'Next.js',
  keywords: ['ROI AI', 'Automazione Aziendale', 'Calcolo Risparmio AI', 'Consulenza AI', 'Rayo Consulting', 'Efficienza Operativa'],
  metadataBase: new URL('https://roi.rayo.consulting'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Calcolatore ROI AI | Scopri Quanto Stai Perdendo',
    description: 'Il tuo business sta bruciando soldi in attività ripetitive? Fai il test gratuito in 2 minuti.',
    url: 'https://roi.rayo.consulting',
    siteName: 'Rayo Consulting',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quanto perde la tua azienda senza AI?',
    description: 'Calcolatore gratuito ROI Rayo Consulting. Scopri il costo nascosto delle inefficienze.',
  },
  icons: {
    icon: '/2.svg',
    shortcut: '/2.svg',
    apple: '/2.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  )
}

