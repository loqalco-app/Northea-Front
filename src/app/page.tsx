'use client'
import { useState } from 'react'

const MARQUEE_ITEMS = ['Ropa', 'Artículos', 'Belleza', 'De USA', 'Todo nuevo y original']
const MARQUEE = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export default function Home() {
  const [email, setEmail]   = useState('')
  const [done, setDone]     = useState(false)

  function handleNotify() {
    if (!email.trim() || !email.includes('@')) return
    setDone(true)
  }

  return (
    <>
      <style>{`
        .page{min-height:100dvh;display:grid;grid-template-rows:auto 1fr auto;padding:30px 36px 34px;gap:0}
        @media(max-width:600px){.page{padding:22px 20px 28px}}
        header{display:flex;align-items:center;justify-content:space-between}
        .wordmark{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.16em;color:var(--fg)}
        .pill{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border:1px solid var(--border);border-radius:50px;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--fg-mid)}
        .pill-dot{width:5px;height:5px;border-radius:50%;background:var(--fg);animation:pulse 2s ease-in-out infinite}
        .hero{display:flex;flex-direction:column;justify-content:center;margin:0 -36px;padding:32px 0 0;overflow:hidden}
        @media(max-width:600px){.hero{margin:0 -20px}}
        .hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(18vw,21.5vw,320px);line-height:.86;letter-spacing:-.005em;color:var(--fg);padding:0 32px;white-space:nowrap;pointer-events:none;animation:fadeUp .9s .05s cubic-bezier(.16,1,.3,1) both}
        @media(max-width:600px){.hero-title{padding:0 18px}}
        .marquee-wrap{margin-top:28px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:11px 0;overflow:hidden;animation:fadeUp .9s .18s cubic-bezier(.16,1,.3,1) both}
        .marquee-track{display:flex;white-space:nowrap;width:max-content;animation:scroll 22s linear infinite}
        .mitem{font-size:10.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--fg-mid);padding:0 20px}
        .msep{font-size:10px;color:var(--fg-dim);padding:0 4px 0 0}
        footer{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-top:28px;animation:fadeUp .9s .3s cubic-bezier(.16,1,.3,1) both}
        @media(max-width:640px){footer{flex-direction:column;align-items:flex-start;gap:20px}}
        .copy{font-size:11px;color:var(--fg-dim);letter-spacing:.04em;line-height:1.6}
        .notify{display:flex;flex-direction:column;gap:8px;min-width:280px}
        @media(max-width:640px){.notify{min-width:100%;width:100%}}
        .notify-label{font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--fg-mid)}
        .notify-row{display:flex;border:1.5px solid var(--fg)}
        .notify-input{flex:1;min-width:0;padding:10px 14px;border:none;background:transparent;font-size:13px;color:var(--fg);font-family:'Inter',sans-serif;outline:none}
        .notify-input::placeholder{color:var(--fg-mid)}
        .notify-btn{padding:10px 16px;border:none;border-left:1.5px solid var(--fg);background:var(--fg);color:var(--bg);font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;transition:opacity .15s;white-space:nowrap}
        .notify-btn:hover{opacity:.7}
        .notify-thanks{font-size:12px;font-weight:500;color:var(--fg-mid);padding:10px 0}
        @media(prefers-reduced-motion:reduce){.marquee-track{animation:none}.hero-title,.marquee-wrap,footer{animation:none}}
      `}</style>

      <div className="page">
        <header>
          <span className="wordmark">NORTHÉA</span>
          <div className="pill">
            <div className="pill-dot" />
            Próximamente
          </div>
        </header>

        <section className="hero">
          <div className="hero-title">NORTHÉA</div>
          <div className="marquee-wrap">
            <div className="marquee-track" aria-hidden="true">
              {MARQUEE.map((item, i) => (
                <span key={i}>
                  <span className="mitem">{item}</span>
                  <span className="msep">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer>
          <div className="copy">
            © 2026 NORTHÉA<br />northea.cc
          </div>
          <div className="notify">
            <div className="notify-label">Avísame cuando lancemos</div>
            {done ? (
              <div className="notify-thanks">✓ Te avisamos en cuanto abramos.</div>
            ) : (
              <div className="notify-row">
                <input
                  className="notify-input"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNotify()}
                />
                <button className="notify-btn" onClick={handleNotify}>Notificar</button>
              </div>
            )}
          </div>
        </footer>
      </div>
    </>
  )
}
