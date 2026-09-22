'use client'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'
import ProductCard from './ProductCard'
import { primaryImage, type ProductT } from '@/lib/types'

const ERP = process.env.NEXT_PUBLIC_ERP_URL

export default function SearchResultsClient({ products, query }: { products: ProductT[]; query: string }) {
  const { addItem } = useCart()
  const [stock, setStock] = useState<Record<string, number>>({})
  const [adding, setAdding] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? '').toLowerCase().includes(q) ||
      p.product_variants.some(v => v.sku.toLowerCase().includes(q))
    )
  }, [products, query])

  useEffect(() => {
    const ids = results.flatMap(p => p.product_variants.map(v => v.id))
    if (!ids.length || !ERP) return
    fetch(`${ERP}/api/store/stock?variant_ids=${ids.join(',')}`)
      .then(r => r.json()).then(d => setStock(d.stock ?? {})).catch(() => {})
  }, [results])

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
        .sr-hero{padding:32px 36px 20px}
        @media(max-width:768px){.sr-hero{padding:22px 20px 14px}}
        .sr-crumb{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:8px}
        .sr-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,46px);letter-spacing:.01em;color:var(--fg);line-height:1.1}
        .sr-count{font-size:12px;color:var(--fg-mid);margin-top:8px}
        .sr-rule{height:1px;background:var(--border);margin:0 36px 28px}
        @media(max-width:768px){.sr-rule{margin:0 20px 20px}}
        .sr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px 18px;padding:0 36px 80px}
        @media(max-width:1024px){.sr-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:768px){.sr-grid{grid-template-columns:repeat(2,1fr);gap:18px 12px;padding:0 20px 60px}}
        .sr-grid .pcard-img-wrap{aspect-ratio:3/4}
        .sr-empty{padding:60px 20px;text-align:center;color:var(--fg-mid);font-size:14px}
      `}</style>

      <div className="sr-hero">
        <div className="sr-crumb">Northéa</div>
        <div className="sr-title">Resultados para &ldquo;{query}&rdquo;</div>
        <div className="sr-count">{results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="sr-rule" />

      {results.length === 0 ? (
        <div className="sr-empty">No encontramos productos con ese nombre. Intenta con otra palabra.</div>
      ) : (
        <div className="sr-grid">
          {results.map(p => (
            <ProductCard key={p.id} product={p} stock={stock} adding={adding === p.id} onQuickAdd={quickAdd} />
          ))}
        </div>
      )}
    </>
  )
}
