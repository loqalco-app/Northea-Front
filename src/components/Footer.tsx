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
          <p className="footer-copy">© {new Date().getFullYear()} Northéa · Lucero Herrera Hernández. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
