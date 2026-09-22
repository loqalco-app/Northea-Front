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
        .hero-wrap{padding:0 36px}
        @media(max-width:768px){.hero-wrap{padding:0 20px}}
        .hero-word{font-family:'Inter',sans-serif;font-weight:900;font-size:clamp(58px,13.5vw,208px);line-height:1.05;letter-spacing:-.03em;color:var(--fg);white-space:nowrap;text-align:center;width:100%;overflow:hidden;padding-top:.08em}
        .hero-rule{height:1px;background:var(--fg);margin:0 36px 0}
        @media(max-width:768px){.hero-rule{margin:0 20px}}
        .strip{display:grid;grid-template-columns:1.1fr .8fr 1fr;gap:32px;padding:28px 36px 48px;align-items:start}
        @media(max-width:860px){.strip{grid-template-columns:1fr;gap:20px;padding:22px 20px 36px}}
        .strip-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:10px}
        .strip-copy{font-size:13.5px;color:var(--fg);line-height:1.65;max-width:420px}
        .strip-center{text-align:center;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);align-self:center}
        @media(max-width:860px){.strip-center{text-align:left}}
        .strip-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
        @media(max-width:860px){.strip-right{align-items:flex-start}}
        .strip-tag{display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--fg)}
        .strip-tag-line{width:22px;height:1px;background:var(--fg-dim)}
        .strip-est{font-size:11px;color:var(--fg-mid);letter-spacing:.08em}
      `}</style>

      <div className="hero-wrap">
        <h1 className="hero-word">NORTHÉA</h1>
      </div>
      <div className="hero-rule" />

      <div className="strip">
        <div>
          <div className="strip-eyebrow">Our Philosophy</div>
          <p className="strip-copy">Ropa, artículos y belleza de USA — todo nuevo y original.<br />Piezas con propósito, disponibilidad real, sin sorpresas.</p>
        </div>
        <div className="strip-center">NORTHÉA · EST. 2026</div>
        <div className="strip-right">
          <div className="strip-tag"><span className="strip-tag-line" />NORTHÉA</div>
          <div className="strip-est">EST. MMXXVI<span style={{display:'inline-block',width:22,height:1,background:'var(--fg-dim)',verticalAlign:'middle',marginLeft:8}} /></div>
        </div>
      </div>

      <ProductGrid products={products} categories={categories} initialCategory={categoria ?? 'all'} />
    </>
  )
}
