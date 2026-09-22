'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart'
import { fmtPrice } from '@/lib/types'

const ERP = process.env.NEXT_PUBLIC_ERP_URL
const ORG = process.env.NEXT_PUBLIC_STORE_ORG_ID

type Step = 'shipping' | 'payment'

interface ShippingForm {
  full_name: string; email: string; phone: string
  address_line1: string; address_line2: string; city: string; state: string; zip: string
}

function luhnFormat(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

export default function CheckoutClient() {
  const { items, total, sessionId, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<Step>('shipping')
  const [shipping, setShipping] = useState<ShippingForm>({
    full_name: '', email: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', zip: '',
  })
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvc: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateShip<K extends keyof ShippingForm>(k: K, v: string) {
    setShipping(s => ({ ...s, [k]: v }))
  }

  function shippingValid() {
    return shipping.full_name.trim() && shipping.email.trim().includes('@') && shipping.phone.trim()
      && shipping.address_line1.trim() && shipping.city.trim() && shipping.state.trim() && shipping.zip.trim()
  }

  function cardValid() {
    const digits = card.number.replace(/\D/g, '')
    return digits.length >= 15 && card.name.trim() && /^\d{2}\/\d{2}$/.test(card.exp) && card.cvc.trim().length >= 3
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!cardValid() || !ERP) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`${ERP}/api/store/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          org_id: ORG,
          session_id: sessionId,
          customer: { full_name: shipping.full_name.trim(), email: shipping.email.trim(), phone: shipping.phone.trim() },
          shipping: {
            address_line1: shipping.address_line1.trim(), address_line2: shipping.address_line2.trim(),
            city: shipping.city.trim(), state: shipping.state.trim(), zip: shipping.zip.trim(),
          },
          items: items.map(i => ({ variant_id: i.variantId, quantity: i.qty })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error === 'reservation_missing' ? 'Uno de tus artículos ya no está reservado, vuelve al carrito.' : 'No pudimos procesar tu pago. Intenta de nuevo.')
        setSubmitting(false)
        return
      }
      clearCart()
      router.push(`/gracias?order=${encodeURIComponent(data.folio)}&total=${data.total}`)
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="chk-empty">
        <p>Tu carrito está vacío.</p>
        <Link href="/">Seguir comprando</Link>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .chk-wrap{max-width:1040px;margin:0 auto;padding:32px 36px 100px;display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:start}
        @media(max-width:900px){.chk-wrap{grid-template-columns:1fr;padding:22px 20px 80px;gap:28px}}
        .chk-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4.5vw,42px);letter-spacing:.01em;color:var(--fg);margin-bottom:24px}
        .chk-empty{padding:100px 20px;text-align:center}
        .chk-empty p{color:var(--fg-mid);margin-bottom:14px}
        .chk-empty a{font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:underline;color:var(--fg)}

        .chk-section{border:1px solid var(--border);border-radius:10px;margin-bottom:16px;overflow:hidden}
        .chk-section-hdr{display:flex;align-items:center;gap:10px;padding:16px 20px;background:var(--surface)}
        .chk-section-num{width:22px;height:22px;border-radius:50%;background:var(--fg);color:var(--bg);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .chk-section-num.pending{background:var(--border);color:var(--fg-mid)}
        .chk-section-title{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--fg)}
        .chk-section-edit{margin-left:auto;font-size:11px;color:var(--fg-mid);text-decoration:underline;background:none;border:none;cursor:pointer}
        .chk-section-body{padding:20px}
        .chk-summary-line{padding:14px 20px;font-size:13px;color:var(--fg-mid);line-height:1.6}
        .chk-summary-line strong{color:var(--fg);font-weight:600}

        .chk-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(max-width:480px){.chk-grid2{grid-template-columns:1fr}}
        .chk-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
        .chk-field label{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg-mid)}
        .chk-field input{border:1px solid var(--border);border-radius:6px;padding:12px 14px;font-size:14px;color:var(--fg);background:var(--bg);font-family:inherit;outline:none;transition:border-color .15s}
        .chk-field input:focus{border-color:var(--fg)}
        .chk-submit{width:100%;padding:16px;background:var(--fg);color:var(--bg);border:none;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;margin-top:6px;transition:opacity .15s}
        .chk-submit:disabled{opacity:.5;cursor:default}
        .chk-err{background:#FEF2F2;color:#B91C1C;font-size:13px;padding:12px 16px;border-radius:6px;margin-bottom:16px}
        .chk-sim-note{display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--fg-mid);background:var(--surface);padding:10px 14px;border-radius:6px;margin-bottom:16px;line-height:1.5}

        .chk-order{border:1px solid var(--border);border-radius:10px;padding:22px;position:sticky;top:24px}
        .chk-order-title{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-mid);margin-bottom:16px}
        .chk-order-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
        .chk-order-thumb{width:52px;height:64px;background:var(--border);border-radius:2px;object-fit:cover;flex-shrink:0}
        .chk-order-name{font-size:13px;font-weight:600;color:var(--fg)}
        .chk-order-meta{font-size:11px;color:var(--fg-mid);margin-top:2px}
        .chk-order-price{font-size:13px;font-weight:700;color:var(--fg);white-space:nowrap;font-variant-numeric:tabular-nums}
        .chk-order-total{display:flex;justify-content:space-between;padding-top:16px;margin-top:4px;font-size:16px;font-weight:800;color:var(--fg)}
      `}</style>

      <div className="chk-wrap">
        <div>
          <div className="chk-title">Pagar</div>
          {error && <div className="chk-err">{error}</div>}

          <div className="chk-section">
            <div className="chk-section-hdr">
              <span className="chk-section-num">1</span>
              <span className="chk-section-title">Datos de envío</span>
              {step === 'payment' && <button className="chk-section-edit" onClick={() => setStep('shipping')}>Editar</button>}
            </div>
            {step === 'shipping' ? (
              <form className="chk-section-body" onSubmit={e => { e.preventDefault(); if (shippingValid()) setStep('payment') }}>
                <div className="chk-grid2">
                  <div className="chk-field"><label>Nombre completo</label><input value={shipping.full_name} onChange={e => updateShip('full_name', e.target.value)} required /></div>
                  <div className="chk-field"><label>Teléfono</label><input value={shipping.phone} onChange={e => updateShip('phone', e.target.value)} required /></div>
                </div>
                <div className="chk-field"><label>Correo electrónico</label><input type="email" value={shipping.email} onChange={e => updateShip('email', e.target.value)} required /></div>
                <div className="chk-field"><label>Dirección</label><input placeholder="Calle y número" value={shipping.address_line1} onChange={e => updateShip('address_line1', e.target.value)} required /></div>
                <div className="chk-field"><label>Colonia / referencia (opcional)</label><input value={shipping.address_line2} onChange={e => updateShip('address_line2', e.target.value)} /></div>
                <div className="chk-grid2">
                  <div className="chk-field"><label>Ciudad</label><input value={shipping.city} onChange={e => updateShip('city', e.target.value)} required /></div>
                  <div className="chk-field"><label>Estado</label><input value={shipping.state} onChange={e => updateShip('state', e.target.value)} required /></div>
                </div>
                <div className="chk-field" style={{ maxWidth: 160 }}><label>Código postal</label><input value={shipping.zip} onChange={e => updateShip('zip', e.target.value)} required /></div>
                <button className="chk-submit" type="submit" disabled={!shippingValid()}>Continuar al pago</button>
              </form>
            ) : (
              <div className="chk-summary-line">
                <strong>{shipping.full_name}</strong><br />
                {shipping.address_line1}{shipping.address_line2 ? `, ${shipping.address_line2}` : ''}<br />
                {shipping.city}, {shipping.state} {shipping.zip} · {shipping.phone}
              </div>
            )}
          </div>

          <div className="chk-section">
            <div className="chk-section-hdr">
              <span className={`chk-section-num${step === 'shipping' ? ' pending' : ''}`}>2</span>
              <span className="chk-section-title">Pago</span>
            </div>
            {step === 'payment' && (
              <form className="chk-section-body" onSubmit={handlePay}>
                <div className="chk-sim-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Entorno de prueba: ningún cargo real se realiza a esta tarjeta.
                </div>
                <div className="chk-field"><label>Número de tarjeta</label><input inputMode="numeric" placeholder="0000 0000 0000 0000" value={card.number} onChange={e => setCard(c => ({ ...c, number: luhnFormat(e.target.value) }))} required /></div>
                <div className="chk-field"><label>Nombre en la tarjeta</label><input value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} required /></div>
                <div className="chk-grid2">
                  <div className="chk-field"><label>Vencimiento (MM/AA)</label><input placeholder="MM/AA" value={card.exp} onChange={e => {
                    let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                    if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`
                    setCard(c => ({ ...c, exp: v }))
                  }} required /></div>
                  <div className="chk-field"><label>CVC</label><input inputMode="numeric" placeholder="123" value={card.cvc} onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} required /></div>
                </div>
                <button className="chk-submit" type="submit" disabled={!cardValid() || submitting}>
                  {submitting ? 'Procesando pago…' : `Pagar ${fmtPrice(total)}`}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="chk-order">
          <div className="chk-order-title">Tu pedido</div>
          {items.map(item => (
            <div className="chk-order-item" key={item.variantId}>
              {item.image ? <img className="chk-order-thumb" src={item.image} alt={item.name} /> : <div className="chk-order-thumb" />}
              <div style={{ flex: 1 }}>
                <div className="chk-order-name">{item.name}</div>
                <div className="chk-order-meta">{item.variantLabel && `${item.variantLabel} · `}Cant. {item.qty}</div>
              </div>
              <div className="chk-order-price">{fmtPrice(item.price * item.qty)}</div>
            </div>
          ))}
          <div className="chk-order-total"><span>Total</span><span>{fmtPrice(total)}</span></div>
        </div>
      </div>
    </>
  )
}
