import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'NORTHÉA',
  description: 'Ropa, artículos y belleza de USA — todo nuevo y original.',
  manifest: '/manifest.json',
}

interface Category { id: string; parent_id: string | null; name: string; slug: string }

async function getCategories(): Promise<Category[]> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return []
  try {
    const res = await fetch(`${base}/api/store/products?org=${org}`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.categories ?? []
  } catch { return [] }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <CartProvider>
          <Header categories={categories} />
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW error:', err))
              })
            }
          `
        }} />
      </body>
    </html>
  )
}
