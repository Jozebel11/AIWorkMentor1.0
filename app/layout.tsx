import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ThriveWithAI - Master AI Tools for Career Success | AI Productivity Training',
  description: 'Learn how to thrive with AI tools instead of fearing job displacement. Comprehensive guides, tutorials, and resources to boost your productivity and advance your career using artificial intelligence.',
  keywords: 'AI tools, artificial intelligence training, career development, productivity, job skills, AI education, workplace AI, professional development',
  authors: [{ name: 'ThriveWithAI Team' }],
  creator: 'ThriveWithAI',
  publisher: 'ThriveWithAI',
  robots: 'index, follow',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thrivewith.ai',
    siteName: 'ThriveWithAI',
    title: 'ThriveWithAI - Master AI Tools for Career Success',
    description: 'Learn how to thrive with AI tools instead of fearing job displacement. Comprehensive guides and resources for AI-powered productivity.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ThriveWithAI - Master AI Tools for Career Success',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThriveWithAI - Master AI Tools for Career Success',
    description: 'Learn how to thrive with AI tools instead of fearing job displacement.',
    creator: '@ThriveWithAI',
  },
  alternates: {
    canonical: 'https://thrivewith.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}