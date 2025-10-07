import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SPORTWAVE - Premium Sportswear Store',
  description: 'Discover premium sportswear designed for champions. Shop the latest collection of athletic apparel, footwear, and accessories.',
  keywords: 'sportswear, athletic wear, running shoes, gym clothes, fitness apparel',
  openGraph: {
    title: 'SPORTWAVE - Premium Sportswear Store',
    description: 'Discover premium sportswear designed for champions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}