export const dynamic = 'force-dynamic'

interface Variant { id: string; name: string; sku: string; sale_price: number; status: string }
interface Image { url: string; is_primary: boolean; sort_order: number; alt_text: string | null }
interface Product {
  id: string; name: string; slug: string; description: string | null
  product_variants: Variant[]
  product_images: Image[]
  category_ids: string[]
}
interface Category { id: string; parent_id: string | null; name: string; slug: string }

async function getCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  const base = process.env.NEXT_PUBLIC_ERP_URL
  const org = process.env.NEXT_PUBLIC_STORE_ORG_ID
  if (!base || !org) return { products: [], categories: [] }

  const res = await fetch(`${base}/api/store/products?org=${org}`, { cache: 'no-store' })
  if (!res.ok) return { products: [], categories: [] }
  return res.json()
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export default async function ProductosPage() {
  const { products, categories } = await getCatalog()

  return (
    <>
      <style>{`
        .ppage{min-height:100dvh;padding:30px 36px 60px}
        @media(max-width:600px){.ppage{padding:22px 20px 44px}}
        .phdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .pword{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.16em;color:var(--fg)}
        .pback{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);text-decoration:none}
        .ptitle{font-family:'Bebas Neue',sans-serif;font-size:clamp(38px,7vw,72px);line-height:.95;letter-spacing:-.005em;color:var(--fg);margin:22px 0 4px}
        .psub{font-size:13px;color:var(--fg-mid);margin-bottom:32px}
        .pempty{padding:80px 0;text-align:center;color:var(--fg-mid);font-size:14px;line-height:1.7}
        .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px}
        .pcard{display:flex;flex-direction:column;gap:10px}
        .pcard-img{aspect-ratio:3/4;background:var(--border);border-radius:2px;overflow:hidden;position:relative}
        .pcard-img img{width:100%;height:100%;object-fit:cover;display:block}
        .pcard-noimg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-dim)}
        .pcard-name{font-size:13px;font-weight:600;color:var(--fg);letter-spacing:.01em}
        .pcard-price{font-size:12px;color:var(--fg-mid);font-variant-numeric:tabular-nums}
        .pfoot{margin-top:56px;font-size:11px;color:var(--fg-dim);letter-spacing:.04em}
      `}</style>

      <div className="ppage">
        <div className="phdr">
          <span className="pword">NORTHÉA</span>
          <a className="pback" href="/">← Volver</a>
        </div>

        <div className="ptitle">Catálogo</div>
        <div className="psub">Vista de prueba — refleja en vivo el switch &quot;Publicado en Tienda&quot; del panel admin.</div>

        {products.length === 0 ? (
          <div className="pempty">
            Sin productos publicados todavía.<br/>
            Activa el switch &quot;Publicado en Tienda&quot; en Stock o en Tienda web dentro del panel para verlos aquí.
          </div>
        ) : (
          <div className="pgrid">
            {products.map(p => {
              const img = [...p.product_images].sort((a, b) => (b.is_primary ? 1 : -1) || a.sort_order - b.sort_order)[0]
              const prices = p.product_variants.map(v => v.sale_price).filter(Boolean)
              const price = prices.length ? Math.min(...prices) : null
              const cats = categories.filter(c => p.category_ids.includes(c.id))
              return (
                <div className="pcard" key={p.id}>
                  <div className="pcard-img">
                    {img ? <img src={img.url} alt={img.alt_text ?? p.name} /> : <div className="pcard-noimg">Sin foto</div>}
                  </div>
                  <div className="pcard-name">{p.name}</div>
                  <div className="pcard-price">{price !== null ? fmt(price) : '—'}{cats.length > 0 ? ` · ${cats.map(c => c.name).join(', ')}` : ''}</div>
                </div>
              )
            })}
          </div>
        )}

        <div className="pfoot">© 2026 NORTHÉA · northea.cc</div>
      </div>
    </>
  )
}
