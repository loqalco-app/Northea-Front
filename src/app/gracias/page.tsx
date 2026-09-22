import ThankYouClient from '@/components/ThankYouClient'
import type { ProductT } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getFeatured(): Promise<ProductT[]> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return []
  try {
    const res = await fetch(`${base}/api/store/products?org=${org}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return (data.featured?.length ? data.featured : data.products) ?? []
  } catch { return [] }
}

export default async function GraciasPage({ searchParams }: { searchParams: Promise<{ order?: string; total?: string }> }) {
  const { order, total } = await searchParams
  const featured = await getFeatured()
  return <ThankYouClient folio={order ?? ''} total={total ? Number(total) : 0} featured={featured} />
}
