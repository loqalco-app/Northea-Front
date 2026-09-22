'use client'
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'

export interface CartItem {
  variantId: string
  productId: string
  slug: string
  name: string
  variantLabel: string
  image: string | null
  price: number
  qty: number
  reservationId: string | null
  maxStock: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (item: Omit<CartItem, 'qty' | 'reservationId'>, qty?: number) => Promise<void>
  updateQty: (variantId: string, qty: number) => Promise<void>
  removeItem: (variantId: string) => Promise<void>
  clearCart: () => void
  sessionId: string
  lastError: string | null
}

const CartContext = createContext<CartContextValue | null>(null)

function getSessionId() {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem('northea_session_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('northea_session_id', id)
    }
    return id
  } catch { return crypto.randomUUID() }
}

const ERP = process.env.NEXT_PUBLIC_ERP_URL
const ORG = process.env.NEXT_PUBLIC_STORE_ORG_ID

async function reserve(sessionId: string, variantId: string, qty: number): Promise<{ reservationId: string | null; error: string | null }> {
  try {
    const res = await fetch(`${ERP}/api/store/reserve`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ org_id: ORG, session_id: sessionId, variant_id: variantId, quantity: qty }),
    })
    const data = await res.json()
    if (!res.ok) return { reservationId: null, error: data.error === 'insufficient_stock' ? `Solo quedan ${data.available} disponibles` : 'No se pudo reservar el producto' }
    return { reservationId: data.reservation_id, error: null }
  } catch { return { reservationId: null, error: 'Error de conexión' } }
}

async function releaseReservation(sessionId: string, reservationId: string) {
  try { await fetch(`${ERP}/api/store/reserve/${reservationId}?session_id=${sessionId}`, { method: 'DELETE' }) } catch { /* best effort */ }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lastError, setLastError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const sessionIdRef = useRef('')

  useEffect(() => {
    sessionIdRef.current = getSessionId()
    try {
      const raw = localStorage.getItem('northea_cart')
      if (raw) setItems(JSON.parse(raw))
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem('northea_cart', JSON.stringify(items)) } catch { /* ignore */ }
  }, [items, hydrated])

  const addItem = useCallback(async (item: Omit<CartItem, 'qty' | 'reservationId'>, qty = 1) => {
    setLastError(null)
    const existing = items.find(i => i.variantId === item.variantId)
    const newQty = (existing?.qty ?? 0) + qty
    const { reservationId, error } = await reserve(sessionIdRef.current, item.variantId, newQty)
    if (error) { setLastError(error); return }
    setItems(prev => {
      const found = prev.find(i => i.variantId === item.variantId)
      if (found) return prev.map(i => i.variantId === item.variantId ? { ...i, qty: newQty, reservationId } : i)
      return [...prev, { ...item, qty: newQty, reservationId }]
    })
    setDrawerOpen(true)
  }, [items])

  const updateQty = useCallback(async (variantId: string, qty: number) => {
    setLastError(null)
    if (qty <= 0) { await removeItemInternal(variantId); return }
    const { reservationId, error } = await reserve(sessionIdRef.current, variantId, qty)
    if (error) { setLastError(error); return }
    setItems(prev => prev.map(i => i.variantId === variantId ? { ...i, qty, reservationId } : i))
  }, [])

  async function removeItemInternal(variantId: string) {
    setItems(prev => {
      const item = prev.find(i => i.variantId === variantId)
      if (item?.reservationId) releaseReservation(sessionIdRef.current, item.reservationId)
      return prev.filter(i => i.variantId !== variantId)
    })
  }

  const removeItem = useCallback(async (variantId: string) => { await removeItemInternal(variantId) }, [])

  const clearCart = useCallback(() => { setItems([]) }, [])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{
      items, count, total, drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem, updateQty, removeItem, clearCart, sessionId: sessionIdRef.current, lastError,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
