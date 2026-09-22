'use client'
import Link from 'next/link'
import { ProductT, fmtPrice, isNewProduct, primaryImage } from '@/lib/types'

export default function ProductCard({ product, stock, adding, onQuickAdd, wide }: {
  product: ProductT; stock: Record<string, number>; adding: boolean; onQuickAdd: (p: ProductT) => void; wide?: boolean
}) {
  const img = primaryImage(product.product_images)
  const price = Math.min(...product.product_variants.map(v => v.sale_price))
  const reg = product.product_variants[0]?.regular_price
  const discPct = reg && reg > price ? Math.round((1 - price / reg) * 100) : null
  const totalStock = product.product_variants.reduce((n, v) => n + (stock[v.id] ?? 0), 0)
  const soldOut = Object.keys(stock).length > 0 && totalStock === 0

  return (
    <div className={`pcard${wide ? ' pcard-wide' : ''}`}>
      <Link href={`/producto/${product.slug}`} className="pcard-img-wrap" style={{ textDecoration: 'none' }}>
        {img ? <img src={img.url} alt={img.alt_text ?? product.name} /> : <div className="pcard-noimg">Sin foto</div>}
        {discPct !== null && <span className="pcard-disc-tag">-{discPct}%</span>}
        {discPct === null && isNewProduct(product.created_at) && <span className="pcard-tag">Nuevo</span>}
        {soldOut && <div className="pcard-sold-out"><span>Agotado</span></div>}
      </Link>
      {!soldOut && (
        <button className="pcard-add" onClick={() => onQuickAdd(product)} disabled={adding} aria-label={`Agregar ${product.name} al carrito`}>
          {adding
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10" opacity=".8"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          }
        </button>
      )}
      <Link href={`/producto/${product.slug}`} style={{ textDecoration: 'none' }}>
        <div className="pcard-info">
          <div className="pcard-name">{product.name}</div>
          <div className="pcard-price-wrap">
            {reg && reg > price && <span className="pcard-price-reg">{fmtPrice(reg)}</span>}
            <span className="pcard-price">{fmtPrice(price)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
