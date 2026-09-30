import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <style>{`
        .site-footer{border-top:1px solid var(--border);margin-top:40px;padding:32px 36px calc(32px + env(safe-area-inset-bottom,0px))}
        .footer-inner{max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}
        .footer-brand{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.02em;color:var(--fg)}
        .footer-links{display:flex;flex-wrap:wrap;gap:20px}
        .footer-links a{font-size:12.5px;color:var(--fg-mid);text-decoration:none}
        .footer-links a:hover{color:var(--fg)}
        .footer-social{display:flex;gap:12px}
        .footer-social a{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;border:1px solid var(--border);color:var(--fg);transition:background .15s,color .15s}
        .footer-social a:hover{background:var(--fg);color:var(--bg)}
        .footer-copy{font-size:11.5px;color:var(--fg-dim);width:100%;padding-top:16px;border-top:1px solid var(--border);margin-top:16px}
        @media(max-width:600px){
          .site-footer{padding:28px 20px calc(28px + env(safe-area-inset-bottom,0px))}
          .footer-inner{flex-direction:column;align-items:flex-start;gap:16px}
        }
      `}</style>
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-brand">northéa</span>
          <nav className="footer-links">
            <Link href="/terminos-condiciones">Términos y Condiciones</Link>
            <Link href="/aviso-privacidad">Aviso de Privacidad</Link>
            <a href="https://wa.me/525523976633" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </nav>
          <div className="footer-social">
            <a href="https://www.instagram.com/northeamx" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Northéa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61594466711294" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Northéa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.5h2.85l.43-3.31H13.5V8.1c0-.96.27-1.61 1.64-1.61h1.75V3.53C16.57 3.44 15.4 3.33 14.03 3.33c-2.86 0-4.82 1.75-4.82 4.95v2.9H6.35v3.31H9.2V22h4.3z"/></svg>
            </a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Northéa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
