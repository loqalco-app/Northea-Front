'use client'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'
import ProductCard from './ProductCard'
import type { ProductT, CategoryT } from '@/lib/types'

const ERP = process.env.NEXT_PUBLIC_ERP_URL
const PAGE_SIZE = 9

export default function ProductGrid({ products, featured, categories, initialCategory }: { products: ProductT[]; featured: ProductT[]; categories: CategoryT[]; initialCategory: string }) {
  const { addItem } = useCart()
  const [activeCat, setActiveCat] = useState(initialCategory)
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')
  const [stock, setStock] = useState<Record<string, number>>({})
  const [adding, setAdding] = useState<string | null>(null)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const roots = categories.filter(c => !c.parent_id)

  useEffect(() => {
    const ids = products.flatMap(p => p.product_variants.map(v => v.id))
    if (!ids.length || !ERP) return
    fetch(`${ERP}/api/store/stock?variant_ids=${ids.join(',')}`)
      .then(r => r.json()).then(d => setStock(d.stock ?? {})).catch(() => {})
  }, [products])

  useEffect(() => { setVisible(PAGE_SIZE) }, [activeCat, sort])

  const filtered = useMemo(() => {
    // "Todo" shows the curated Home selection when one exists; any specific
    // category tab always browses the full catalog for that category.
    let list = activeCat === 'all'
      ? (featured.length > 0 ? featured : products)
      : products.filter(p => {
          const cat = categories.find(c => c.slug === activeCat)
          return cat && p.category_ids.includes(cat.id)
        })
    const priceOf = (p: ProductT) => Math.min(...p.product_variants.map(v => v.sale_price))
    if (sort === 'price-asc') list = [...list].sort((a, b) => priceOf(a) - priceOf(b))
    if (sort === 'price-desc') list = [...list].sort((a, b) => priceOf(b) - priceOf(a))
    return list
  }, [products, featured, activeCat, sort, categories])

  const bento = sort === 'featured'
  const shown = filtered.slice(0, visible)

  async function quickAdd(p: ProductT, variantId: string) {
    const v = p.product_variants.find(vv => vv.id === variantId)
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

        .pg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 20px;padding:0 36px 40px;grid-auto-flow:dense}
        @media(max-width:1024px){.pg-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:768px){.pg-grid{padding:0 20px 32px;grid-template-columns:repeat(2,1fr);gap:20px 14px}}

        .pg-cell{display:flex}
        .pg-cell .pcard-img-wrap{aspect-ratio:3/4}
        .pg-cell.wide{grid-column:span 2}
        .pg-cell.wide .pcard-img-wrap{aspect-ratio:16/10}
        @media(max-width:768px){
          .pg-cell.wide{grid-column:span 2}
          .pg-cell.wide .pcard-img-wrap{aspect-ratio:4/3}
        }

        .pg-more-wrap{display:flex;justify-content:center;padding:0 36px 80px}
        @media(max-width:768px){.pg-more-wrap{padding:0 20px 60px}}
        .pg-more{padding:13px 32px;background:var(--accent);color:white;border:none;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:opacity .15s}
        .pg-more:hover{opacity:.85}

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
        <>
          <div className="pg-grid">
            {shown.map((p, i) => (
              <div key={p.id} className={`pg-cell${bento && i % 3 === 0 ? ' wide' : ''}`}>
                <ProductCard product={p} stock={stock} adding={adding === p.id} onQuickAdd={quickAdd} wide={bento && i % 3 === 0} />
              </div>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="pg-more-wrap">
              <button className="pg-more" onClick={() => setVisible(v => v + PAGE_SIZE)}>Ver más productos</button>
            </div>
          )}
        </>
      )}
    </>
  )
}
