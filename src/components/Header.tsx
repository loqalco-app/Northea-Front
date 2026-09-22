'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

interface Category { id: string; parent_id: string | null; name: string; slug: string }

export default function Header({ categories }: { categories: Category[] }) {
  const { count, openDrawer } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const roots = categories.filter(c => !c.parent_id)

  return (
    <>
      <style>{`
        .hdr{display:flex;align-items:center;justify-content:space-between;padding:20px 36px;background:var(--bg)}
        @media(max-width:768px){.hdr{padding:16px 20px}}
        .hdr-mark{display:flex;align-items:center;flex-shrink:0}
        .hdr-mark img{height:28px;width:auto;display:block}
        @media(max-width:480px){.hdr-mark img{height:24px}}
        .hdr-nav{display:flex;align-items:center;gap:32px}
        @media(max-width:860px){.hdr-nav{display:none}}
        .hdr-link{font-size:14px;font-weight:500;color:var(--fg);text-decoration:none;transition:opacity .15s}
        .hdr-link:hover,.hdr-link.active{opacity:.55}
        .hdr-actions{display:flex;align-items:center;gap:16px}
        .hdr-cart-btn{position:relative;background:none;border:none;cursor:pointer;padding:6px;color:var(--fg);display:flex}
        .hdr-cart-badge{position:absolute;top:-2px;right:-2px;background:var(--accent);color:white;font-size:10px;font-weight:800;width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .hdr-burger{display:none;background:none;border:none;cursor:pointer;padding:6px;color:var(--fg)}
        @media(max-width:860px){.hdr-burger{display:flex}}
        .hdr-mobile{display:none;flex-direction:column;padding:8px 20px 20px;background:var(--bg)}
        .hdr-mobile.open{display:flex}
        .hdr-mobile a{padding:12px 0;font-size:14px;font-weight:600;color:var(--fg);text-decoration:none;border-bottom:1px solid var(--border)}
        .hdr-mobile a:last-child{border-bottom:none}
      `}</style>
      <header className="hdr">
        <Link href="/" className="hdr-mark"><img src="/logo-lockup.png" alt="NORTHÉA" /></Link>
        <nav className="hdr-nav">
          <Link href="/" className="hdr-link">Shop</Link>
          {roots.map(c => <Link key={c.id} href={`/?categoria=${c.slug}`} className="hdr-link">{c.name}</Link>)}
        </nav>
        <div className="hdr-actions">
          <button className="hdr-cart-btn" onClick={openDrawer} aria-label="Ver carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 3H2"/><circle cx="9" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>
            {count > 0 && <span className="hdr-cart-badge">{count}</span>}
          </button>
          <button className="hdr-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
          </button>
        </div>
      </header>
      <div className={`hdr-mobile${menuOpen ? ' open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Shop</Link>
        {roots.map(c => <Link key={c.id} href={`/?categoria=${c.slug}`} onClick={() => setMenuOpen(false)}>{c.name}</Link>)}
      </div>
    </>
  )
}
