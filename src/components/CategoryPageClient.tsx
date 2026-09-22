'use client'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'
import ProductCard from './ProductCard'
import { primaryImage, type ProductT, type CategoryT } from '@/lib/types'

const ERP = process.env.NEXT_PUBLIC_ERP_URL

export default function CategoryPageClient({ category, categories, products }: { category: CategoryT; categories: CategoryT[]; products: ProductT[] }) {
  const { addItem } = useCart()
  const subcats = useMemo(() => categories.filter(c => c.parent_id === category.id), [categories, category])
  const [activeSub, setActiveSub] = useState<string>('all')
  const [stock, setStock] = useState<Record<string, number>>({})
  const [adding, setAdding] = useState<string | null>(null)

  const allIds = useMemo(() => [category.id, ...subcats.map(c => c.id)], [category, subcats])
  const inCategory = useMemo(() => products.filter(p => p.category_ids.some(id => allIds.includes(id))), [products, allIds])
  const filtered = useMemo(
    () => activeSub === 'all' ? inCategory : inCategory.filter(p => p.category_ids.includes(activeSub)),
    [inCategory, activeSub]
  )

  useEffect(() => {
    const ids = inCategory.flatMap(p => p.product_variants.map(v => v.id))
    if (!ids.length || !ERP) return
    fetch(`${ERP}/api/store/stock?variant_ids=${ids.join(',')}`)
      .then(r => r.json()).then(d => setStock(d.stock ?? {})).catch(() => {})
  }, [inCategory])

  function countFor(id: string) {
    return products.filter(p => p.category_ids.includes(id)).length
  }

  async function quickAdd(p: ProductT, variantId: string) {
    const v = p.product_variants.find(vv => vv.id === variantId)
    if (!v) return
    setAdding(p.id)
    const img = primaryImage(p.product_images)
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
        .cat-hero{padding:32px 36px 20px}
        @media(max-width:768px){.cat-hero{padding:22px 20px 14px}}
        .cat-crumb{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:8px}
        .cat-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(34px,5.5vw,58px);letter-spacing:.01em;color:var(--fg);line-height:1}
        .cat-count{font-size:12px;color:var(--fg-mid);margin-top:8px}
        .cat-rule{height:1px;background:var(--border);margin:0 36px 28px}
        @media(max-width:768px){.cat-rule{margin:0 20px 20px}}

        .cat-layout{display:grid;grid-template-columns:200px 1fr;gap:36px;padding:0 36px 80px;align-items:start}
        @media(max-width:860px){.cat-layout{grid-template-columns:1fr;padding:0 20px 60px;gap:20px}}

        .cat-sidebar{display:flex;flex-direction:column;gap:2px;position:sticky;top:90px;background:var(--surface);border-radius:10px;padding:16px 14px}
        @media(max-width:860px){.cat-sidebar{position:static;border-radius:0;background:none;padding:0 0 12px;flex-direction:row;overflow-x:auto;gap:8px;border-bottom:1px solid var(--border)}}
        .cat-sidebar-lbl{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:10px;padding:0 4px}
        @media(max-width:860px){.cat-sidebar-lbl{display:none}}
        .cat-side-link{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 8px;border-radius:6px;font-size:13.5px;font-weight:500;color:var(--fg-mid);background:none;border:none;cursor:pointer;text-align:left;white-space:nowrap}
        .cat-side-link.active{color:var(--fg);font-weight:700;background:var(--bg)}
        @media(max-width:860px){.cat-side-link{padding:6px 12px;border:1px solid var(--border);border-radius:50px}.cat-side-link.active{background:var(--fg);color:var(--bg);border-color:var(--fg)}}
        .cat-side-count{font-size:11px;color:var(--fg-dim);font-variant-numeric:tabular-nums}
        @media(max-width:860px){.cat-side-count{display:none}}

        .cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px 18px}
        @media(max-width:768px){.cat-grid{grid-template-columns:repeat(2,1fr);gap:18px 12px}}
        .cat-grid .pcard-img-wrap{aspect-ratio:3/4}
        .cat-empty{padding:60px 20px;text-align:center;color:var(--fg-mid);font-size:14px}
      `}</style>

      <div className="cat-hero">
        <div className="cat-crumb">Northéa</div>
        <div className="cat-title">{category.name}</div>
        <div className="cat-count">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="cat-rule" />

      <div className="cat-layout">
        <aside className="cat-sidebar">
          <div className="cat-sidebar-lbl">Categorías</div>
          <button className={`cat-side-link${activeSub === 'all' ? ' active' : ''}`} onClick={() => setActiveSub('all')}>
            <span>Todo</span><span className="cat-side-count">{inCategory.length}</span>
          </button>
          {subcats.map(s => (
            <button key={s.id} className={`cat-side-link${activeSub === s.id ? ' active' : ''}`} onClick={() => setActiveSub(s.id)}>
              <span>{s.name}</span><span className="cat-side-count">{countFor(s.id)}</span>
            </button>
          ))}
        </aside>

        {filtered.length === 0 ? (
          <div className="cat-empty">Aún no hay productos en esta sección.</div>
        ) : (
          <div className="cat-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} stock={stock} adding={adding === p.id} onQuickAdd={quickAdd} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
