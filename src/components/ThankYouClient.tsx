'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import ProductCard from './ProductCard'
import { primaryImage, type ProductT } from '@/lib/types'

const ERP = process.env.NEXT_PUBLIC_ERP_URL
const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function ThankYouClient({ folio, total, featured }: { folio: string; total: number; featured: ProductT[] }) {
  const { addItem } = useCart()
  const [stock, setStock] = useState<Record<string, number>>({})
  const [adding, setAdding] = useState<string | null>(null)

  const suggestions = useMemo(() => featured.slice(0, 4), [featured])

  useEffect(() => {
    const ids = suggestions.flatMap(p => p.product_variants.map(v => v.id))
    if (!ids.length || !ERP) return
    fetch(`${ERP}/api/store/stock?variant_ids=${ids.join(',')}`)
      .then(r => r.json()).then(d => setStock(d.stock ?? {})).catch(() => {})
  }, [suggestions])

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
        .ty-hero{max-width:640px;margin:0 auto;padding:64px 36px 40px;text-align:center}
        @media(max-width:768px){.ty-hero{padding:48px 20px 32px}}
        .ty-check{width:64px;height:64px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
        .ty-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(30px,5vw,44px);letter-spacing:.01em;color:var(--fg);line-height:1.1;margin-bottom:12px}
        .ty-sub{font-size:14px;color:var(--fg-mid);line-height:1.6;margin-bottom:28px}
        .ty-folio{display:inline-flex;flex-direction:column;gap:2px;padding:16px 28px;background:var(--surface);border-radius:10px;margin-bottom:28px}
        .ty-folio-lbl{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid)}
        .ty-folio-val{font-size:20px;font-weight:800;color:var(--fg);font-variant-numeric:tabular-nums}
        .ty-total{font-size:13px;color:var(--fg-mid);margin-top:4px}
        .ty-actions{display:flex;flex-direction:column;gap:12px;align-items:center}
        .ty-continue{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--fg);text-decoration:underline}
        .ty-wa{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;background:#25D366;color:white;border-radius:50px;font-size:13px;font-weight:700;text-decoration:none}
        .ty-note{font-size:12px;color:var(--fg-dim);margin-top:8px;max-width:380px;line-height:1.6}

        .ty-rec{padding:8px 36px 90px;border-top:1px solid var(--border);margin-top:12px}
        @media(max-width:768px){.ty-rec{padding:8px 20px 70px}}
        .ty-rec-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-mid);text-align:center;margin:32px 0 20px}
        .ty-rec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px 16px;max-width:1040px;margin:0 auto}
        @media(max-width:860px){.ty-rec-grid{grid-template-columns:repeat(2,1fr)}}
        .ty-rec-grid .pcard-img-wrap{aspect-ratio:3/4}
      `}</style>

      <div className="ty-hero">
        <div className="ty-check">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className="ty-title">¡Gracias por confiar en nosotros!</div>
        <div className="ty-sub">Tu pago fue una transacción exitosa. Te enviamos un correo con el detalle de tu compra.</div>
        <div className="ty-folio">
          <span className="ty-folio-lbl">Orden</span>
          <span className="ty-folio-val">#{folio}</span>
          {total > 0 && <span className="ty-total">Total pagado: {total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 })}</span>}
        </div>
        <div className="ty-actions">
          {WA_PHONE && (
            <a className="ty-wa" href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hola, tengo una duda sobre mi orden #${folio}`)}`} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.893-1.554-4.044-3.522-.306-.525.306-.487.874-1.622.098-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.204-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.04 3.13 5.007 4.27 2.482.986 2.982.79 3.522.74.54-.049 1.758-.72 2.006-1.414.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12.014 0C5.406 0 .049 5.357.049 11.965c0 2.31.647 4.532 1.87 6.461L.049 24l5.756-1.827a11.9 11.9 0 0 0 6.21 1.802h.005c6.608 0 11.965-5.357 11.965-11.965S18.622.045 12.014.045zm.005 21.891h-.005a9.9 9.9 0 0 1-5.05-1.386l-.362-.216-3.766 1.197 1.216-3.671-.236-.377a9.895 9.895 0 0 1-1.517-5.289c0-5.472 4.454-9.925 9.925-9.925 2.651 0 5.14 1.033 7.014 2.909a9.858 9.858 0 0 1 2.906 7.021c0 5.472-4.454 9.925-9.925 9.925z"/></svg>
              Escríbenos por WhatsApp
            </a>
          )}
          <Link href="/" className="ty-continue">Seguir comprando</Link>
          <div className="ty-note">¿Alguna duda con tu pedido? No dudes en comunicarte con nosotros por WhatsApp, estamos aquí para ayudarte.</div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="ty-rec">
          <div className="ty-rec-title">También te puede interesar</div>
          <div className="ty-rec-grid">
            {suggestions.map(p => (
              <ProductCard key={p.id} product={p} stock={stock} adding={adding === p.id} onQuickAdd={quickAdd} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
