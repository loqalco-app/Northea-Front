'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'

interface Variant { id: string; name: string; sku: string; sale_price: number; regular_price: number | null; status: string }
interface Image { url: string; is_primary: boolean; sort_order: number; alt_text: string | null }
interface Product {
  id: string; name: string; slug: string; description: string | null; created_at: string
  product_variants: Variant[]; product_images: Image[]; category_ids: string[]
}
interface Category { id: string; parent_id: string | null; name: string; slug: string }

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
function isNew(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < 14 * 24 * 60 * 60 * 1000
}

const ERP = process.env.NEXT_PUBLIC_ERP_URL

export default function ProductGrid({ products, featured, categories, initialCategory }: { products: Product[]; featured: Product[]; categories: Category[]; initialCategory: string }) {
  const { addItem } = useCart()
  const [activeCat, setActiveCat] = useState(initialCategory)
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')
  const [stock, setStock] = useState<Record<string, number>>({})
  const [adding, setAdding] = useState<string | null>(null)

  const roots = categories.filter(c => !c.parent_id)

  useEffect(() => {
    const ids = products.flatMap(p => p.product_variants.map(v => v.id))
    if (!ids.length || !ERP) return
    fetch(`${ERP}/api/store/stock?variant_ids=${ids.join(',')}`)
      .then(r => r.json()).then(d => setStock(d.stock ?? {})).catch(() => {})
  }, [products])

  const filtered = useMemo(() => {
    // "Todo" shows the curated Home selection when one exists; any specific
    // category tab always browses the full catalog for that category.
    let list = activeCat === 'all'
      ? (featured.length > 0 ? featured : products)
      : products.filter(p => {
          const cat = categories.find(c => c.slug === activeCat)
          return cat && p.category_ids.includes(cat.id)
        })
    const priceOf = (p: Product) => Math.min(...p.product_variants.map(v => v.sale_price))
    if (sort === 'price-asc') list = [...list].sort((a, b) => priceOf(a) - priceOf(b))
    if (sort === 'price-desc') list = [...list].sort((a, b) => priceOf(b) - priceOf(a))
    return list
  }, [products, featured, activeCat, sort, categories])

  function productStock(p: Product) {
    return p.product_variants.reduce((n, v) => n + (stock[v.id] ?? 0), 0)
  }

  async function quickAdd(p: Product) {
    const v = p.product_variants.find(vv => (stock[vv.id] ?? 0) > 0) ?? p.product_variants[0]
    if (!v) return
    setAdding(p.id)
    const img = [...p.product_images].sort((a, b) => (b.is_primary ? 1 : -1) || a.sort_order - b.sort_order)[0]
    await addItem({
      variantId: v.id, productId: p.id, slug: p.slug, name: p.name,
      variantLabel: v.name === 'Estándar' ? '' : v.name,
      image: img?.url ?? null, price: v.sale_price, maxStock: stock[v.id] ?? 0,
    })
    setAdding(null)
  }

  return (
    <>
      <style>{`
        .pg-tabs{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 36px;margin-bottom:28px;flex-wrap:wrap}
        @media(max-width:768px){.pg-tabs{padding:0 20px}}
        .pg-tab-row{display:flex;gap:6px;flex-wrap:wrap}
        .pg-tab{padding:8px 16px;font-size:12px;font-weight:600;letter-spacing:.04em;border:1px solid var(--border);background:transparent;color:var(--fg-mid);cursor:pointer;border-radius:2px;white-space:nowrap}
        .pg-tab.active{background:var(--fg);color:var(--bg);border-color:var(--fg)}
        .pg-sort{padding:8px 12px;font-size:12px;font-weight:600;border:1px solid var(--border);background:var(--bg);color:var(--fg);border-radius:2px}
        .pg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:28px 20px;padding:0 36px 80px}
        @media(max-width:768px){.pg-grid{padding:0 20px 60px;grid-template-columns:repeat(2,1fr);gap:24px 14px}}
        .pg-card{display:flex;flex-direction:column;gap:10px}
        .pg-img-wrap{position:relative;aspect-ratio:3/4;background:var(--border);overflow:hidden}
        .pg-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}
        .pg-card:hover .pg-img-wrap img{transform:scale(1.03)}
        .pg-noimg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-dim)}
        .pg-tag{position:absolute;top:10px;left:10px;background:var(--surface);color:var(--fg);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:5px 10px;border-radius:50px}
        .pg-disc-tag{position:absolute;top:10px;left:10px;background:var(--accent);color:white;font-size:11px;font-weight:800;padding:4px 8px;border-radius:4px}
        .pg-sold-out{position:absolute;inset:0;background:rgba(255,255,255,0.62);display:flex;align-items:center;justify-content:center}
        .pg-sold-out span{background:var(--fg);color:var(--bg);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:50px}
        .pg-add{position:absolute;bottom:10px;right:10px;width:36px;height:36px;border-radius:50%;background:var(--surface);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15);color:var(--fg);transition:transform .12s}
        .pg-add:hover{transform:scale(1.08)}
        .pg-add:disabled{opacity:.4;cursor:not-allowed}
        .pg-info{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
        .pg-name{font-size:13.5px;font-weight:600;color:var(--fg);line-height:1.3}
        .pg-price-wrap{display:flex;align-items:baseline;gap:6px;flex-shrink:0;white-space:nowrap}
        .pg-price{font-size:13.5px;font-weight:700;color:var(--fg);font-variant-numeric:tabular-nums}
        .pg-price-reg{font-size:11px;color:var(--fg);text-decoration:line-through;font-variant-numeric:tabular-nums}
        .pg-empty{padding:100px 20px;text-align:center;color:var(--fg-mid);font-size:14px}
      `}</style>

      <div className="pg-tabs">
        <div className="pg-tab-row">
          <button className={`pg-tab${activeCat === 'all' ? ' active' : ''}`} onClick={() => setActiveCat('all')}>Todo</button>
          {roots.map(c => (
            <button key={c.id} className={`pg-tab${activeCat === c.slug ? ' active' : ''}`} onClick={() => setActiveCat(c.slug)}>{c.name}</button>
          ))}
        </div>
        <select className="pg-sort" value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
          <option value="featured">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="pg-empty">Aún no hay productos en esta categoría.</div>
      ) : (
        <div className="pg-grid">
          {filtered.map(p => {
            const img = [...p.product_images].sort((a, b) => (b.is_primary ? 1 : -1) || a.sort_order - b.sort_order)[0]
            const price = Math.min(...p.product_variants.map(v => v.sale_price))
            const reg = p.product_variants[0]?.regular_price
            const discPct = reg && reg > price ? Math.round((1 - price / reg) * 100) : null
            const totalStock = productStock(p)
            const soldOut = Object.keys(stock).length > 0 && totalStock === 0
            return (
              <div className="pg-card" key={p.id}>
                <Link href={`/producto/${p.slug}`} className="pg-img-wrap" style={{ textDecoration: 'none' }}>
                  {img ? <img src={img.url} alt={img.alt_text ?? p.name} /> : <div className="pg-noimg">Sin foto</div>}
                  {discPct !== null && <span className="pg-disc-tag">-{discPct}%</span>}
                  {discPct === null && isNew(p.created_at) && <span className="pg-tag">Nuevo</span>}
                  {soldOut && <div className="pg-sold-out"><span>Agotado</span></div>}
                </Link>
                {!soldOut && (
                  <button className="pg-add" onClick={() => quickAdd(p)} disabled={adding === p.id} aria-label={`Agregar ${p.name} al carrito`}>
                    {adding === p.id
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10" opacity=".8"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    }
                  </button>
                )}
                <Link href={`/producto/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="pg-info">
                    <div className="pg-name">{p.name}</div>
                    <div className="pg-price-wrap">
                      {reg && reg > price && <span className="pg-price-reg">{fmt(reg)}</span>}
                      <span className="pg-price">{fmt(price)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
