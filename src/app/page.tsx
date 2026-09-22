import ProductGrid from '@/components/ProductGrid'

export const dynamic = 'force-dynamic'

interface Variant { id: string; name: string; sku: string; sale_price: number; regular_price: number | null; status: string }
interface Image { url: string; is_primary: boolean; sort_order: number; alt_text: string | null }
interface Product {
  id: string; name: string; slug: string; description: string | null; created_at: string
  product_variants: Variant[]; product_images: Image[]; category_ids: string[]
}
interface Category { id: string; parent_id: string | null; name: string; slug: string }

async function getCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return { products: [], categories: [] }
  try {
    const res = await fetch(`${base}/api/store/products?org=${org}`, { cache: 'no-store' })
    if (!res.ok) return { products: [], categories: [] }
    return res.json()
  } catch { return { products: [], categories: [] } }
}

export default async function HomePage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { products, categories } = await getCatalog()
  const { categoria } = await searchParams

  return (
    <>
      <style>{`
        .home-hero{padding:56px 36px 40px}
        @media(max-width:768px){.home-hero{padding:36px 20px 28px}}
        .home-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,9vw,110px);line-height:.9;letter-spacing:-.005em;color:var(--fg)}
        .home-sub{margin-top:14px;font-size:14px;color:var(--fg-mid);max-width:480px;line-height:1.6}
      `}</style>
      <section className="home-hero">
        <div className="home-title">NORTHÉA</div>
        <p className="home-sub">Ropa, artículos y belleza — todo nuevo y original. Piezas seleccionadas, disponibilidad real, sin sorpresas.</p>
      </section>
      <ProductGrid products={products} categories={categories} initialCategory={categoria ?? 'all'} />
    </>
  )
}
