import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad — NORTHÉA',
  description: 'Aviso de privacidad de Northéa: qué datos recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.',
}

export default function AvisoPrivacidadPage() {
  return (
    <>
      <style>{`
        .legal-page{max-width:760px;margin:0 auto;padding:40px 36px 100px}
        @media(max-width:768px){.legal-page{padding:24px 20px 80px}}
        .legal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,5vw,44px);letter-spacing:.01em;color:var(--fg);line-height:1.05;margin-bottom:6px}
        .legal-updated{font-size:12px;color:var(--fg-mid);margin-bottom:32px}
        .legal-h2{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.01em;color:var(--fg);margin:36px 0 12px}
        .legal-page p{font-size:13.5px;color:var(--fg);line-height:1.7;margin:0 0 12px}
        .legal-page ul{margin:0 0 12px;padding-left:18px}
        .legal-page li{font-size:13.5px;color:var(--fg);line-height:1.7;margin-bottom:6px}
        .legal-page strong{font-weight:600}
        .legal-table{width:100%;border-collapse:collapse;margin:0 0 16px;font-size:13px}
        .legal-table th,.legal-table td{text-align:left;padding:10px 12px;border:1px solid var(--border);vertical-align:top}
        .legal-table th{width:38%;color:var(--fg-mid);font-weight:600;font-size:12px}
        .legal-note{font-size:12px;color:var(--fg-mid);border-top:1px solid var(--border);padding-top:16px;margin-top:32px}
        .legal-page a{color:var(--fg);text-decoration:underline}
      `}</style>
      <main className="legal-page">
        <h1 className="legal-title">Aviso de Privacidad</h1>
        <p className="legal-updated">Última actualización: 30 de septiembre de 2026</p>

        <h2 className="legal-h2">1. Responsable del tratamiento de tus datos</h2>
        <p>
          Lucero Herrera Hernández, que opera bajo el nombre comercial Northéa (en adelante, &ldquo;Northéa&rdquo;),
          es responsable del uso y protección de tus datos personales, conforme a la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares.
        </p>
        <table className="legal-table">
          <tbody>
            <tr><th>Domicilio</th><td>Calle Escalerillas No. 49, Col. Metropolitana Segunda Sección, C.P. 57740, Ciudad Nezahualcóyotl, Municipio de Nezahualcóyotl, Estado de México</td></tr>
            <tr><th>Correo para asuntos de privacidad</th><td>northea.co@gmail.com</td></tr>
            <tr><th>WhatsApp</th><td>+52 55 2397 6633</td></tr>
            <tr><th>Sitio web</th><td>northea.cc</td></tr>
          </tbody>
        </table>
        <p>
          Este aviso aplica a los datos que recabamos cuando compras en northea.cc, por WhatsApp o cuando te
          comunicas con nosotros por cualquiera de nuestros medios oficiales.
        </p>

        <h2 className="legal-h2">2. Datos personales que recabamos</h2>
        <p>Para atender tu compra y tu relación con Northéa, recabamos los siguientes datos:</p>
        <ul>
          <li><strong>Identificación y contacto:</strong> nombre completo, correo electrónico y número de teléfono o WhatsApp.</li>
          <li><strong>Entrega:</strong> domicilio de entrega, referencias y nombre de quien recibe.</li>
          <li><strong>Compra y pago:</strong> productos comprados, montos, método de pago y comprobantes de pago o de transferencia. Los datos completos de tu tarjeta los procesa la plataforma de pago; Northéa no los almacena.</li>
          <li><strong>Atención y reclamaciones:</strong> mensajes de WhatsApp y correo, y las fotos o videos que nos envíes como evidencia.</li>
          <li><strong>Navegación:</strong> dirección IP, tipo de dispositivo y navegador, y datos de uso del sitio mediante cookies.</li>
        </ul>
        <p>
          <strong>Datos sensibles.</strong> Northéa no solicita datos personales sensibles (por ejemplo, salud, origen
          étnico, religión, ideología o vida sexual). Te pedimos no incluirlos en tus mensajes ni en las fotos o
          videos que nos envíes.
        </p>

        <h2 className="legal-h2">3. Para qué usamos tus datos</h2>
        <p><strong>Finalidades necesarias.</strong> Sin estos usos no podemos darte el servicio:</p>
        <ul>
          <li>Procesar tu pedido, confirmar el pago y apartar la pieza.</li>
          <li>Gestionar apartados por WhatsApp.</li>
          <li>Preparar y enviar tu pedido, y darte seguimiento de la entrega.</li>
          <li>Enviarte confirmaciones y avisos de tu compra por correo o WhatsApp.</li>
          <li>Atender consultas, reclamaciones, cancelaciones, revocaciones, cambios, créditos y reembolsos.</li>
          <li>Prevenir fraudes y cumplir obligaciones legales y fiscales.</li>
        </ul>
        <p><strong>Finalidades opcionales.</strong> Estos usos no son necesarios para tu compra:</p>
        <ul>
          <li>Enviarte novedades, lanzamientos, promociones, cupones y dinámicas.</li>
          <li>Conocer cómo usas el sitio para mejorar la tienda y tu experiencia de compra.</li>
        </ul>
        <p>
          Si no quieres que usemos tus datos para las finalidades opcionales, escríbenos a{' '}
          <a href="mailto:northea.co@gmail.com">northea.co@gmail.com</a> o por WhatsApp. Tu negativa no afecta tu
          compra ni tu atención.
        </p>

        <h2 className="legal-h2">4. Con quién compartimos tus datos</h2>
        <p>Northéa no vende tus datos personales. Solo los compartimos cuando es necesario para atender tu compra:</p>
        <table className="legal-table">
          <tbody>
            <tr><th>Paqueterías (99 Minutos, Estafeta, DHL y otras)</th><td>Nombre, domicilio de entrega y teléfono, para entregar tu pedido.</td></tr>
            <tr><th>Plataformas y pasarelas de pago</th><td>Datos de pago y monto de la compra, para procesar tu pago.</td></tr>
            <tr><th>Proveedores de la tienda en línea, correo y mensajería</th><td>Datos de contacto y de tu pedido, para operar el sitio y enviarte confirmaciones y mensajes.</td></tr>
            <tr><th>Autoridades competentes</th><td>Los que la ley o una orden de autoridad exijan, para cumplir obligaciones legales.</td></tr>
          </tbody>
        </table>
        <p>
          Estos terceros solo pueden usar tus datos para prestar el servicio que les encargamos. Si en el futuro
          Northéa necesitara compartir tus datos para otros fines, te lo informará y pedirá tu consentimiento cuando
          la ley lo exija.
        </p>

        <h2 className="legal-h2">5. Tus derechos y cómo ejercerlos</h2>
        <p>
          Tienes derecho a acceder a tus datos y saber cómo los usamos, a rectificarlos si son inexactos, a
          cancelarlos cuando consideres que no se necesitan, y a oponerte a que se usen para ciertos fines (derechos
          ARCO). También puedes revocar el consentimiento que nos diste y limitar el uso o la divulgación de tus
          datos.
        </p>
        <p>
          Para ejercer cualquiera de estos derechos, envía una solicitud a{' '}
          <a href="mailto:northea.co@gmail.com">northea.co@gmail.com</a> o por WhatsApp al{' '}
          <a href="https://wa.me/525523976633" target="_blank" rel="noopener noreferrer">+52 55 2397 6633</a> con:
        </p>
        <ul>
          <li>Tu nombre y un medio para responderte.</li>
          <li>Una copia de una identificación oficial vigente, o un medio para acreditar tu identidad.</li>
          <li>La descripción clara del derecho que quieres ejercer y de los datos a los que se refiere.</li>
        </ul>
        <p>
          Northéa te responderá por el medio que indiques y dentro de los plazos que marca la ley. Ten en cuenta
          que, si cancelas datos que necesitamos para cumplir una obligación legal o atender una compra en curso,
          puede haber un periodo en que debamos conservarlos.
        </p>

        <h2 className="legal-h2">6. Cookies, menores, cambios al aviso y autoridad</h2>
        <p>
          <strong>Cookies.</strong> El sitio northea.cc puede usar cookies y tecnologías similares para que funcione
          el carrito de compras, recordar tus preferencias y obtener estadísticas de uso. Puedes desactivarlas o
          borrarlas desde la configuración de tu navegador, aunque algunas funciones del sitio podrían dejar de
          funcionar.
        </p>
        <p>
          <strong>Menores de edad.</strong> Northéa no dirige sus productos ni su publicidad a menores. Si un menor
          compra, debe hacerlo con la autorización de su madre, padre o tutor, quien será responsable del
          tratamiento de esos datos. Si detectamos datos de un menor recabados sin esa autorización, los
          eliminaremos.
        </p>
        <p>
          <strong>Cambios a este aviso.</strong> Northéa puede modificar este aviso. Publicaremos la versión vigente
          en northea.cc con su fecha de actualización, y si el cambio es importante te lo avisaremos por nuestros
          medios oficiales.
        </p>
        <p>
          <strong>Autoridad.</strong> Si consideras que tu derecho a la protección de tus datos personales fue
          vulnerado, puedes acudir ante la autoridad competente en la materia: actualmente, la Secretaría
          Anticorrupción y Buen Gobierno.
        </p>

        <p className="legal-note">Consulta también nuestros <a href="/terminos-condiciones">Términos y Condiciones</a>.</p>
      </main>
    </>
  )
}
