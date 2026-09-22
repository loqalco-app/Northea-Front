import SearchResultsClient from '@/components/SearchResultsClient'
import type { ProductT } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getProducts(): Promise<ProductT[]> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return []
  try {
    const res = await fetch(`${base}/api/store/products?org=${org}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
  } catch { return [] }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const products = await getProducts()
  return <SearchResultsClient products={products} query={q ?? ''} />
}
