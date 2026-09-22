'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export default function CartDrawer() {
  const { items, total, drawerOpen, closeDrawer, updateQty, removeItem, lastError } = useCart()

  return (
    <>
      <style>{`
        .cd-scrim{position:fixed;inset:0;background:rgba(0,0,0,0.35);z-index:90;opacity:0;pointer-events:none;transition:opacity .2s}
        .cd-scrim.open{opacity:1;pointer-events:auto}
        .cd-panel{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:92vw;background:var(--bg);z-index:91;transform:translateX(100%);transition:transform .25s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column;box-shadow:-8px 0 30px rgba(0,0,0,0.12)}
        .cd-panel.open{transform:translateX(0)}
        .cd-hdr{display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid var(--border)}
        .cd-title{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.04em;color:var(--fg)}
        .cd-close{background:none;border:none;cursor:pointer;color:var(--fg);padding:6px}
        .cd-body{flex:1;overflow-y:auto;padding:12px 20px}
        .cd-empty{padding:60px 0;text-align:center;color:var(--fg-mid);font-size:13px}
        .cd-item{display:flex;gap:12px;padding:16px 0;border-bottom:1px solid var(--border)}
        .cd-thumb{width:64px;height:80px;background:var(--border);border-radius:2px;object-fit:cover;flex-shrink:0}
        .cd-item-name{font-size:13px;font-weight:600;color:var(--fg)}
        .cd-item-variant{font-size:11px;color:var(--fg-mid);margin-top:2px;text-transform:uppercase;letter-spacing:.04em}
        .cd-item-row{display:flex;align-items:center;justify-content:space-between;margin-top:8px}
        .cd-qty{display:flex;align-items:center;border:1px solid var(--border)}
        .cd-qty button{width:26px;height:26px;background:none;border:none;cursor:pointer;font-size:14px;color:var(--fg)}
        .cd-qty span{width:24px;text-align:center;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
        .cd-item-price{font-size:13px;font-weight:700;color:var(--fg);font-variant-numeric:tabular-nums}
        .cd-remove{font-size:11px;color:var(--fg-dim);text-decoration:underline;background:none;border:none;cursor:pointer;padding:0;margin-top:6px}
        .cd-err{background:#FEF2F2;color:#B91C1C;font-size:12px;padding:10px 14px;border-radius:6px;margin:10px 0}
        .cd-foot{padding:18px 20px;border-top:1px solid var(--border)}
        .cd-total-row{display:flex;justify-content:space-between;font-size:14px;font-weight:700;color:var(--fg);margin-bottom:14px}
        .cd-checkout{display:block;width:100%;text-align:center;padding:14px;background:var(--fg);color:var(--bg);font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px}
        .cd-continue{display:block;text-align:center;margin-top:10px;font-size:12px;color:var(--fg-mid);text-decoration:underline;cursor:pointer;background:none;border:none;width:100%;padding:4px}
      `}</style>
      <div className={`cd-scrim${drawerOpen ? ' open' : ''}`} onClick={closeDrawer} />
      <div className={`cd-panel${drawerOpen ? ' open' : ''}`} role="dialog" aria-label="Carrito">
        <div className="cd-hdr">
          <span className="cd-title">Carrito</span>
          <button className="cd-close" onClick={closeDrawer} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="cd-body">
          {lastError && <div className="cd-err">{lastError}</div>}
          {items.length === 0 ? (
            <div className="cd-empty">Tu carrito está vacío</div>
          ) : items.map(item => (
            <div className="cd-item" key={item.variantId}>
              {item.image ? <img className="cd-thumb" src={item.image} alt={item.name} /> : <div className="cd-thumb" />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="cd-item-name">{item.name}</div>
                {item.variantLabel && <div className="cd-item-variant">{item.variantLabel}</div>}
                <div className="cd-item-row">
                  <div className="cd-qty">
                    <button onClick={() => updateQty(item.variantId, item.qty - 1)} aria-label="Quitar uno">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.variantId, item.qty + 1)} disabled={item.qty >= item.maxStock} aria-label="Agregar uno">+</button>
                  </div>
                  <div className="cd-item-price">{fmt(item.price * item.qty)}</div>
                </div>
                <button className="cd-remove" onClick={() => removeItem(item.variantId)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cd-foot">
            <div className="cd-total-row"><span>Total</span><span>{fmt(total)}</span></div>
            <Link href="/carrito" className="cd-checkout" onClick={closeDrawer}>Ver carrito</Link>
            <button className="cd-continue" onClick={closeDrawer}>Seguir comprando</button>
          </div>
        )}
      </div>
    </>
  )
}
