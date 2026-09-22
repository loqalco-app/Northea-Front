'use client'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'

interface Variant { id: string; name: string; sku: string; sale_price: number; regular_price: number | null; quantity_disponible: number; in_stock: boolean }
interface Image { url: string; is_primary: boolean; sort_order: number; alt_text: string | null }
interface Category { id: string; parent_id: string | null; name: string; slug: string }
interface Product { id: string; name: string; slug: string; description: string | null; product_variants: Variant[]; product_images: Image[]; categories: Category[] }

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()

  const hasColors = product.product_variants.some(v => v.name.includes(' / ')) || new Set(product.product_variants.map(v => v.name)).size > 1
  const colorGroups = useMemo(() => {
    if (!hasColors) return []
    const map = new Map<string, Variant[]>()
    for (const v of product.product_variants) {
      const [color] = v.name.includes(' / ') ? v.name.split(' / ') : [v.name]
      if (!map.has(color)) map.set(color, [])
      map.get(color)!.push(v)
    }
    return Array.from(map.entries()).map(([color, variants]) => ({ color, variants }))
  }, [product.product_variants, hasColors])

  const [activeColor, setActiveColor] = useState(colorGroups[0]?.color ?? '')
  const activeVariants = hasColors ? (colorGroups.find(g => g.color === activeColor)?.variants ?? []) : product.product_variants
  const hasSizes = hasColors && activeVariants.some(v => v.name.includes(' / '))

  const [activeSize, setActiveSize] = useState<string>('')
  useEffect(() => {
    if (hasSizes) {
      const firstInStock = activeVariants.find(v => v.in_stock) ?? activeVariants[0]
      setActiveSize(firstInStock ? firstInStock.name.split(' / ')[1] : '')
    }
  }, [activeColor, hasSizes, activeVariants])

  const selectedVariant = hasSizes
    ? activeVariants.find(v => v.name.split(' / ')[1] === activeSize)
    : activeVariants[0]

  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeImgIdx, setActiveImgIdx] = useState(0)

  const images = useMemo(() => [...product.product_images].sort((a, b) => (b.is_primary ? 1 : -1) || a.sort_order - b.sort_order), [product.product_images])

  const price = selectedVariant?.sale_price ?? product.product_variants[0]?.sale_price ?? 0
  const regular = selectedVariant?.regular_price ?? null
  const discPct = regular && regular > price ? Math.round((1 - price / regular) * 100) : null
  const inStock = selectedVariant?.in_stock ?? false
  const maxQty = selectedVariant?.quantity_disponible ?? 0

  async function handleAdd() {
    if (!selectedVariant || !inStock) return
    setAdding(true)
    const label = [activeColor, activeSize].filter(Boolean).join(' / ')
    await addItem({
      variantId: selectedVariant.id, productId: product.id, slug: product.slug, name: product.name,
      variantLabel: label === 'Estándar' ? '' : label,
      image: images[0]?.url ?? null, price, maxStock: maxQty,
    }, qty)
    setAdding(false); setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <style>{`
        .pd-wrap{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:32px 36px 80px;align-items:start}
        @media(max-width:860px){.pd-wrap{grid-template-columns:1fr;gap:20px;padding:16px 20px 60px}}
        .pd-gallery-main{position:relative;aspect-ratio:3/4;background:var(--border);overflow:hidden}
        .pd-gallery-disc{position:absolute;top:14px;left:14px;background:var(--accent);color:white;font-size:13px;font-weight:800;padding:5px 10px;border-radius:4px;z-index:1}
        .pd-gallery-main img{width:100%;height:100%;object-fit:cover;display:block}
        .pd-gallery-thumbs{display:flex;gap:8px;margin-top:10px;overflow-x:auto}
        .pd-thumb{width:64px;height:80px;flex-shrink:0;background:var(--border);overflow:hidden;cursor:pointer;opacity:.55;transition:opacity .15s}
        .pd-thumb.active{opacity:1;outline:1.5px solid var(--fg)}
        .pd-thumb img{width:100%;height:100%;object-fit:cover}
        .pd-info{position:sticky;top:90px}
        @media(max-width:860px){.pd-info{position:static}}
        .pd-crumb{font-size:11px;color:var(--fg-mid);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
        .pd-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,4vw,38px);letter-spacing:.01em;color:var(--fg);line-height:1.05}
        .pd-price-row{display:flex;align-items:baseline;gap:10px;margin:14px 0 6px}
        .pd-price{font-size:22px;font-weight:700;color:var(--fg)}
        .pd-price-reg{font-size:15px;color:var(--fg);text-decoration:line-through}
        .pd-disc-badge{background:var(--accent);color:white;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px}
        .pd-desc{font-size:13.5px;color:var(--fg-mid);line-height:1.7;margin:16px 0 22px;max-width:440px}
        .pd-section-lbl{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:10px}
        .pd-swatches{display:flex;gap:8px;margin-bottom:22px;flex-wrap:wrap}
        .pd-swatch{padding:9px 16px;border:1px solid var(--border);background:transparent;color:var(--fg);font-size:12.5px;font-weight:600;cursor:pointer;border-radius:2px}
        .pd-swatch.active{border-color:var(--fg);background:var(--fg);color:var(--bg)}
        .pd-swatch:disabled{opacity:.35;cursor:not-allowed;text-decoration:line-through}
        .pd-qty-row{display:flex;align-items:center;gap:16px;margin-bottom:20px}
        .pd-qty{display:flex;align-items:center;border:1px solid var(--border)}
        .pd-qty button{width:38px;height:38px;background:none;border:none;cursor:pointer;font-size:16px;color:var(--fg)}
        .pd-qty span{width:36px;text-align:center;font-size:14px;font-weight:600}
        .pd-stock-note{font-size:12px;color:var(--fg-mid)}
        .pd-stock-note.low{color:var(--accent);font-weight:600}
        .pd-add-btn{width:100%;padding:16px;background:var(--fg);color:var(--bg);border:none;font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:opacity .15s}
        .pd-add-btn:hover{opacity:.85}
        .pd-add-btn:disabled{opacity:.4;cursor:not-allowed}
        .pd-added-note{text-align:center;font-size:12px;color:var(--fg-mid);margin-top:10px}
      `}</style>
      <div className="pd-wrap">
        <div>
          <div className="pd-gallery-main">
            {discPct !== null && <span className="pd-gallery-disc">-{discPct}%</span>}
            {images[activeImgIdx] ? <img src={images[activeImgIdx].url} alt={product.name} /> : null}
          </div>
          {images.length > 1 && (
            <div className="pd-gallery-thumbs">
              {images.map((img, i) => (
                <div key={i} className={`pd-thumb${i === activeImgIdx ? ' active' : ''}`} onClick={() => setActiveImgIdx(i)}>
                  <img src={img.url} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pd-info">
          {product.categories[0] && <div className="pd-crumb">{product.categories[0].name}</div>}
          <div className="pd-name">{product.name}</div>
          <div className="pd-price-row">
            {regular && regular > price && <span className="pd-price-reg">{fmt(regular)}</span>}
            <span className="pd-price">{fmt(price)}</span>
            {discPct !== null && <span className="pd-disc-badge">-{discPct}%</span>}
          </div>
          {product.description && <p className="pd-desc">{product.description}</p>}

          {hasColors && colorGroups.length > 1 && (
            <>
              <div className="pd-section-lbl">Color</div>
              <div className="pd-swatches">
                {colorGroups.map(g => (
                  <button key={g.color} className={`pd-swatch${activeColor === g.color ? ' active' : ''}`} onClick={() => setActiveColor(g.color)}>{g.color}</button>
                ))}
              </div>
            </>
          )}

          {hasSizes && (
            <>
              <div className="pd-section-lbl">Talla</div>
              <div className="pd-swatches">
                {activeVariants.map(v => {
                  const size = v.name.split(' / ')[1]
                  return (
                    <button key={v.id} className={`pd-swatch${activeSize === size ? ' active' : ''}`} disabled={!v.in_stock} onClick={() => setActiveSize(size)}>{size}</button>
                  )
                })}
              </div>
            </>
          )}

          <div className="pd-qty-row">
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Menos">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(maxQty || 1, q + 1))} disabled={qty >= maxQty} aria-label="Más">+</button>
            </div>
            {inStock ? (
              maxQty <= 5 && <span className="pd-stock-note low">Solo quedan {maxQty}</span>
            ) : (
              <span className="pd-stock-note low">Agotado</span>
            )}
          </div>

          <button className="pd-add-btn" onClick={handleAdd} disabled={!inStock || adding}>
            {adding ? 'Agregando…' : !inStock ? 'Agotado' : 'Agregar al carrito'}
          </button>
          {added && <div className="pd-added-note">✓ Agregado al carrito</div>}
        </div>
      </div>
    </>
  )
}
