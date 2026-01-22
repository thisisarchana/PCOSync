import React from "react"
import type { Metadata, Viewport } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito'
});

const nunitoSans = Nunito_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-nunito-sans'
});

export const metadata: Metadata = {
  title: 'PCOSync - AI-Powered PCOS Care & Prevention',
  description: 'Your personalized companion for PCOS awareness, prevention, and lifestyle management. Get AI-powered insights, personalized diet plans, exercise guidance, and mental health support.',
  generator: 'v0.app',
  keywords: ['PCOS', 'PCOD', 'women health', 'healthcare', 'prevention', 'lifestyle', 'diet', 'exercise'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FEF9E7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
