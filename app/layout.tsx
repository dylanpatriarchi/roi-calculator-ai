import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calcolatore ROI AI | Scopri Quanto Stai Perdendo',
  description: 'Calcola quanto la tua azienda perde ogni anno senza l\'automazione AI. Scopri il potenziale ROI dell\'intelligenza artificiale per il tuo business.',
  keywords: 'ROI AI, calcolatore ROI, automazione AI, intelligenza artificiale, business automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}

