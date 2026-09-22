'use client'

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function WhatsAppButton() {
  if (!PHONE) return null
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, tengo una duda sobre un producto de NORTHÉA')}`

  return (
    <>
      <style>{`
        .wa-fab{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.22);z-index:60;transition:transform .15s;text-decoration:none}
        .wa-fab:hover{transform:scale(1.06)}
        @media(max-width:600px){.wa-fab{width:50px;height:50px;bottom:16px;right:16px}}
      `}</style>
      <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.893-1.554-4.044-3.522-.306-.525.306-.487.874-1.622.098-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.204-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.04 3.13 5.007 4.27 2.482.986 2.982.79 3.522.74.54-.049 1.758-.72 2.006-1.414.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12.014 0C5.406 0 .049 5.357.049 11.965c0 2.31.647 4.532 1.87 6.461L.049 24l5.756-1.827a11.9 11.9 0 0 0 6.21 1.802h.005c6.608 0 11.965-5.357 11.965-11.965S18.622.045 12.014.045zm.005 21.891h-.005a9.9 9.9 0 0 1-5.05-1.386l-.362-.216-3.766 1.197 1.216-3.671-.236-.377a9.895 9.895 0 0 1-1.517-5.289c0-5.472 4.454-9.925 9.925-9.925 2.651 0 5.14 1.033 7.014 2.909a9.858 9.858 0 0 1 2.906 7.021c0 5.472-4.454 9.925-9.925 9.925z"/></svg>
      </a>
    </>
  )
}
