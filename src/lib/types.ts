export interface Variant { id: string; name: string; sku: string; sale_price: number; regular_price: number | null; status: string }
export interface ProductImageT { url: string; is_primary: boolean; sort_order: number; alt_text: string | null }
export interface ProductT {
  id: string; name: string; slug: string; description: string | null; created_at: string
  product_variants: Variant[]; product_images: ProductImageT[]; category_ids: string[]
}
export interface CategoryT { id: string; parent_id: string | null; name: string; slug: string }

export function fmtPrice(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
export function isNewProduct(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < 14 * 24 * 60 * 60 * 1000
}
export function primaryImage(images: ProductImageT[]) {
  return [...images].sort((a, b) => (b.is_primary ? 1 : -1) || a.sort_order - b.sort_order)[0]
}
