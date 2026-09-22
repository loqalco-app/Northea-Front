import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'

export const dynamic = 'force-dynamic'

async function getProduct(slug: string) {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return null
  try {
    const res = await fetch(`${base}/api/store/products/${slug}?org=${org}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.product
  } catch { return null }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
