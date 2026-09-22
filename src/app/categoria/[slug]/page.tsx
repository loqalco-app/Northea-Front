import { notFound } from 'next/navigation'
import CategoryPageClient from '@/components/CategoryPageClient'
import type { ProductT, CategoryT } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getCatalog(): Promise<{ products: ProductT[]; categories: CategoryT[] }> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return { products: [], categories: [] }
  try {
    const res = await fetch(`${base}/api/store/products?org=${org}`, { cache: 'no-store' })
    if (!res.ok) return { products: [], categories: [] }
    return res.json()
  } catch { return { products: [], categories: [] } }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { products, categories } = await getCatalog()
  const category = categories.find(c => c.slug === slug)
  if (!category) notFound()

  return <CategoryPageClient category={category} categories={categories} products={products} />
}
