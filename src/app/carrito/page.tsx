'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function CartPage() {
  const { items, total, updateQty, removeItem, lastError } = useCart()

  function buildWhatsAppLink() {
    const lines = items.map(i => `• ${i.name}${i.variantLabel ? ` (${i.variantLabel})` : ''} x${i.qty} — ${fmt(i.price * i.qty)}`)
    const msg = `Hola, quiero comprar:\n\n${lines.join('\n')}\n\nTotal: ${fmt(total)}\n\n¿Cómo continúo con el pago?`
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`
  }

  return (
    <>
      <style>{`
        .cart-page{max-width:820px;margin:0 auto;padding:40px 36px 100px}
        @media(max-width:768px){.cart-page{padding:24px 20px 80px}}
        .cart-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px);letter-spacing:.01em;color:var(--fg);margin-bottom:28px}
        .cart-empty{padding:80px 0;text-align:center}
        .cart-empty p{color:var(--fg-mid);font-size:14px;margin-bottom:18px}
        .cart-empty a{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--fg);text-decoration:underline}
        .cart-row{display:flex;gap:16px;padding:20px 0;border-bottom:1px solid var(--border)}
        .cart-thumb{width:88px;height:110px;background:var(--border);object-fit:cover;flex-shrink:0}
        .cart-item-top{display:flex;justify-content:space-between;gap:12px}
        .cart-item-name{font-size:14px;font-weight:600;color:var(--fg)}
        .cart-item-variant{font-size:12px;color:var(--fg-mid);margin-top:3px;text-transform:uppercase;letter-spacing:.04em}
        .cart-item-price{font-size:14px;font-weight:700;color:var(--fg);white-space:nowrap;font-variant-numeric:tabular-nums}
        .cart-item-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:14px}
        .cart-qty{display:flex;align-items:center;border:1px solid var(--border)}
        .cart-qty button{width:32px;height:32px;background:none;border:none;cursor:pointer;font-size:15px;color:var(--fg)}
        .cart-qty span{width:30px;text-align:center;font-size:13px;font-weight:600}
        .cart-remove{font-size:12px;color:var(--fg-dim);text-decoration:underline;background:none;border:none;cursor:pointer}
        .cart-err{background:#FEF2F2;color:#B91C1C;font-size:13px;padding:12px 16px;border-radius:6px;margin-bottom:16px}
        .cart-summary{margin-top:28px;padding-top:20px}
        .cart-total-row{display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:var(--fg);margin-bottom:20px}
        .cart-checkout{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;background:#25D366;color:white;border:none;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border-radius:2px;text-decoration:none}
        .cart-checkout-note{font-size:12px;color:var(--fg-mid);text-align:center;margin-top:12px;line-height:1.6}
        .cart-continue{display:block;text-align:center;margin-top:16px;font-size:12px;color:var(--fg-mid);text-decoration:underline}
      `}</style>
      <div className="cart-page">
        <div className="cart-title">Tu carrito</div>
        {lastError && <div className="cart-err">{lastError}</div>}
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío.</p>
            <Link href="/">Seguir comprando</Link>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div className="cart-row" key={item.variantId}>
                {item.image ? <img className="cart-thumb" src={item.image} alt={item.name} /> : <div className="cart-thumb" />}
                <div style={{ flex: 1 }}>
                  <div className="cart-item-top">
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      {item.variantLabel && <div className="cart-item-variant">{item.variantLabel}</div>}
                    </div>
                    <div className="cart-item-price">{fmt(item.price * item.qty)}</div>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.variantId, item.qty - 1)} aria-label="Menos">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.variantId, item.qty + 1)} disabled={item.qty >= item.maxStock} aria-label="Más">+</button>
                    </div>
                    <button className="cart-remove" onClick={() => removeItem(item.variantId)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <div className="cart-total-row"><span>Total</span><span>{fmt(total)}</span></div>
              {WA_PHONE ? (
                <a className="cart-checkout" href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.893-1.554-4.044-3.522-.306-.525.306-.487.874-1.622.098-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.204-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.04 3.13 5.007 4.27 2.482.986 2.982.79 3.522.74.54-.049 1.758-.72 2.006-1.414.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12.014 0C5.406 0 .049 5.357.049 11.965c0 2.31.647 4.532 1.87 6.461L.049 24l5.756-1.827a11.9 11.9 0 0 0 6.21 1.802h.005c6.608 0 11.965-5.357 11.965-11.965S18.622.045 12.014.045zm.005 21.891h-.005a9.9 9.9 0 0 1-5.05-1.386l-.362-.216-3.766 1.197 1.216-3.671-.236-.377a9.895 9.895 0 0 1-1.517-5.289c0-5.472 4.454-9.925 9.925-9.925 2.651 0 5.14 1.033 7.014 2.909a9.858 9.858 0 0 1 2.906 7.021c0 5.472-4.454 9.925-9.925 9.925z"/></svg>
                  Finalizar por WhatsApp
                </a>
              ) : (
                <div className="cart-err">Falta configurar el número de WhatsApp para recibir pedidos.</div>
              )}
              <div className="cart-checkout-note">Pago con tarjeta próximamente. Por ahora confirmamos tu pedido y coordinamos el pago por WhatsApp.</div>
              <Link href="/" className="cart-continue">Seguir comprando</Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
