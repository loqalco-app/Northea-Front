import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — NORTHÉA',
  description: 'Términos y condiciones de compra y uso del sitio northea.cc y de las compras por WhatsApp.',
}

export default function TerminosCondicionesPage() {
  return (
    <>
      <style>{`
        .legal-page{max-width:760px;margin:0 auto;padding:40px 36px 100px}
        @media(max-width:768px){.legal-page{padding:24px 20px 80px}}
        .legal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,5vw,44px);letter-spacing:.01em;color:var(--fg);line-height:1.05;margin-bottom:6px}
        .legal-updated{font-size:12px;color:var(--fg-mid);margin-bottom:32px}
        .legal-h2{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:.01em;color:var(--fg);margin:36px 0 12px}
        .legal-h3{font-size:14px;font-weight:700;color:var(--fg);margin:20px 0 8px}
        .legal-page p{font-size:13.5px;color:var(--fg);line-height:1.7;margin:0 0 12px}
        .legal-page ul,.legal-page ol{margin:0 0 12px;padding-left:18px}
        .legal-page li{font-size:13.5px;color:var(--fg);line-height:1.7;margin-bottom:6px}
        .legal-page strong{font-weight:600}
        .legal-table{width:100%;border-collapse:collapse;margin:0 0 16px;font-size:13px}
        .legal-table th,.legal-table td{text-align:left;padding:10px 12px;border:1px solid var(--border);vertical-align:top}
        .legal-table th{width:38%;color:var(--fg-mid);font-weight:600;font-size:12px}
        .legal-note{font-size:12px;color:var(--fg-mid);border-top:1px solid var(--border);padding-top:16px;margin-top:32px}
        .legal-page a{color:var(--fg);text-decoration:underline}
        .legal-annex{margin-top:40px;padding-top:24px;border-top:1px solid var(--border)}
        .legal-annex dl{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:13px;margin-top:12px}
        .legal-annex dt{color:var(--fg-mid)}
        .legal-annex dd{border-bottom:1px solid var(--border);min-height:18px}
      `}</style>
      <main className="legal-page">
        <h1 className="legal-title">Términos y Condiciones de Compra y Uso</h1>
        <p className="legal-updated">Última actualización: 29 de septiembre de 2026</p>

        <h2 className="legal-h2">1. Datos del proveedor, aceptación y uso del sitio</h2>
        <p>
          Estos Términos y Condiciones regulan la compra de productos y el uso del sitio northea.cc, así como las
          compras realizadas por WhatsApp. Al comprar o usar el sitio, aceptas estos términos.
        </p>
        <table className="legal-table">
          <tbody>
            <tr><th>Nombre comercial</th><td>Northéa</td></tr>
            <tr><th>Titular</th><td>Lucero Herrera Hernández</td></tr>
            <tr><th>RFC</th><td>HEHL850402RD5</td></tr>
            <tr><th>Domicilio</th><td>Calle Escalerillas No. 49, Col. Metropolitana Segunda Sección, C.P. 57740, Ciudad Nezahualcóyotl, Municipio de Nezahualcóyotl, Estado de México (entre Av. López Mateos y calle Caballito)</td></tr>
            <tr><th>Correo de atención</th><td>northea.co@gmail.com</td></tr>
            <tr><th>WhatsApp de atención</th><td>+52 55 2397 6633</td></tr>
            <tr><th>Sitio web</th><td>northea.cc</td></tr>
          </tbody>
        </table>
        <p>
          Northéa es una tienda 100% en línea. El domicilio anterior es el domicilio del proveedor para efectos
          legales y de reclamaciones; no es una tienda física ni un punto de venta o recolección al público.
        </p>
        <p>
          <strong>Uso del sitio.</strong> Te comprometes a usar el sitio de forma lícita, a proporcionar información
          verdadera al comprar y a no realizar actos que dañen el sitio, sus sistemas o a otros usuarios. Northéa
          puede suspender o cancelar pedidos en los que detecte fraude, uso indebido o información falsa, y en ese
          caso devolverá el importe pagado.
        </p>

        <h2 className="legal-h2">2. Edad y capacidad para comprar</h2>
        <p>
          Northéa no restringe la compra por edad. Sin embargo, para pagar con tarjeta es necesario tener la edad y
          la capacidad legal para ser titular de una, o contar con la autorización del titular de la tarjeta
          utilizada.
        </p>
        <p>
          Si eres menor de edad, debes comprar con el conocimiento y la autorización de tu madre, padre o tutor,
          quien será responsable de la compra. Northéa no verifica la edad de quien compra y no es responsable del
          uso de medios de pago por parte de personas no autorizadas por su titular.
        </p>

        <h2 className="legal-h2">3. Productos, piezas únicas, fotografías y tallas</h2>
        <p>
          <strong>Ropa nueva.</strong> Northéa vende ropa y calzado nuevos, de outlet, sin detalles, sin
          imperfecciones y sin desgaste, con sus etiquetas. Si en el futuro se ofrecen prendas de segunda mano o con
          alguna otra característica, se indicará de forma clara en la descripción de cada producto.
        </p>
        <p>
          <strong>Piezas únicas y existencias.</strong> La mayoría de las piezas son únicas. En ocasiones puede
          haber dos o más unidades del mismo modelo. La disponibilidad se confirma hasta que el pago es recibido;
          mientras tanto, la pieza puede venderse a otra persona.
        </p>
        <p>
          <strong>Empaque.</strong> Todas las prendas se entregan en bolsas de Northéa. El calzado puede entregarse
          sin la caja original del fabricante, salvo que la descripción del producto indique lo contrario.
        </p>
        <p>
          <strong>Fotografías reales.</strong> Todas las fotografías y videos publicados son del producto real que
          recibirás. Northéa las toma directamente y no utiliza imágenes generadas con inteligencia artificial ni
          tomadas de internet. Puede haber pequeñas diferencias de color por la pantalla o la iluminación.
        </p>
        <p>
          <strong>Detalles informados.</strong> Si una pieza llegara a tener algún detalle, Northéa lo informará en
          la página web o por WhatsApp antes de la compra. Al comprar una pieza con un detalle informado, aceptas
          sus condiciones particulares y ese detalle no será motivo de reclamación.
        </p>
        <p>
          <strong>Tallas.</strong> Cada producto muestra su talla y, cuando esté disponible, sus medidas. Es tu
          responsabilidad revisar la guía de tallas y las medidas antes de comprar. Las tallas pueden variar entre
          marcas. Si la talla no te queda, puedes ejercer tu derecho de revocación conforme a la sección 9; fuera de
          ese supuesto, no hay cambios ni devoluciones por talla, color, gusto o arrepentimiento.
        </p>

        <h2 className="legal-h2">4. Precios, IVA y errores de precio</h2>
        <p>
          Todos los precios están en pesos mexicanos (MXN) e incluyen IVA. El costo de envío, cuando aplique, se
          muestra por separado antes de pagar.
        </p>
        <p>
          Si se publica un precio con un error evidente (por ejemplo, una prenda de $1,999 publicada en $199),
          Northéa se reserva el derecho de cancelar la operación y devolver el importe pagado, siempre que se lo
          notifique de forma expresa al cliente. Northéa no está obligada a vender al precio erróneo.
        </p>

        <h2 className="legal-h2">5. Proceso de compra, pagos y seguridad</h2>
        <p><strong>Cómo comprar.</strong> Puedes comprar en northea.cc o por WhatsApp. No necesitas crear una cuenta; puedes comprar como invitado.</p>
        <p>
          <strong>Confirmación.</strong> La compra queda confirmada cuando Northéa recibe el pago. En ese momento se
          envía una confirmación al correo electrónico que proporcionaste. Antes de pagar, el sitio te muestra los
          productos, el precio total, el costo de envío y estos términos.
        </p>
        <p>
          <strong>Métodos de pago.</strong> Tarjeta de crédito o débito, transferencia bancaria, links de pago,
          depósito en OXXO o en otras tiendas de conveniencia, y otros medios en línea que se habiliten. En la
          tienda en línea, el pago se procesa y la pieza se aparta de inmediato en existencias una vez confirmado.
        </p>
        <p>
          <strong>Seguridad de la información.</strong> Los pagos con tarjeta y en línea se procesan a través de
          plataformas y pasarelas de pago de terceros que utilizan conexiones cifradas. Northéa no almacena los
          datos completos de tu tarjeta. La información personal que proporcionas se trata conforme al{' '}
          <a href="/aviso-privacidad">Aviso de Privacidad</a> de Northéa.
        </p>

        <h2 className="legal-h2">6. Apartados por WhatsApp y promociones</h2>
        <p>
          <strong>Apartados.</strong> Los apartados solo están disponibles por WhatsApp, no en la tienda en línea.
          Para apartar una pieza debes pagar el 10% del precio del pedido. Tienes un máximo de 15 días naturales
          para liquidar el resto. El pedido no se envía ni se entrega hasta que esté pagado al 100%; una vez
          liquidado, Northéa gestiona el envío.
        </p>
        <p>
          Si decides no continuar con el apartado, o no lo liquidas dentro del plazo, Northéa retendrá el 10%
          pagado por concepto de gastos administrativos y de gestión del apartado, y la pieza volverá a estar
          disponible para la venta. Esta condición se te informa por WhatsApp antes de que apartes.
        </p>
        <p>
          <strong>Promociones.</strong> Northéa puede ofrecer cupones, descuentos, lanzamientos, envío gratis y
          promociones por tiempo limitado. Cada promoción tiene sus propios términos y condiciones, que se dan a
          conocer al momento de su lanzamiento, y aplican junto con estos términos generales.
        </p>

        <h2 className="legal-h2">7. Envíos</h2>
        <p>
          <strong>Cobertura y paqueterías.</strong> Northéa envía a todo México con paqueterías como 99 Minutos,
          Estafeta y DHL, entre otras. Te informamos con qué paquetería se envió tu pedido.
        </p>
        <p>
          <strong>Costo y tiempos.</strong> El costo de envío varía según la dirección de entrega y se muestra antes
          de pagar. El envío es gratis en compras de $500 MXN o más. Northéa prepara el pedido en 2 a 3 días hábiles
          a partir de la confirmación del pago. El tiempo de entrega depende de la paquetería y del destino.
        </p>
        <p>
          <strong>Dirección incorrecta.</strong> Es responsabilidad del cliente proporcionar una dirección completa
          y correcta. Si la dirección es incorrecta, el cliente debe resolverlo con la paquetería; Northéa ayudará
          en lo que sea posible.
        </p>
        <p>
          <strong>Paquete no recibido.</strong> Si nadie recibe el paquete y regresa a Northéa, puedes solicitar que
          se envíe de nuevo pagando otra vez el costo del envío.
        </p>
        <p>
          <strong>Paquete perdido.</strong> Si la paquetería pierde tu paquete, Northéa se hace responsable de
          levantar la reclamación ante la paquetería. Si la pieza sigue disponible, se envía de nuevo sin costo. Si
          ya no hay otra pieza igual, puedes elegir entre el reembolso de lo pagado o un crédito en tienda por ese
          monto.
        </p>

        <h2 className="legal-h2">8. Paquete abierto o manipulado y evidencia</h2>
        <p>
          Si el paquete llega abierto o con señales de manipulación, pero el producto está completo y sin daño, no
          hay motivo de reclamación.
        </p>
        <p>
          Si el paquete llega abierto o manipulado y el producto está dañado o hay faltantes, Northéa se hace
          responsable y gestiona el caso con la paquetería. Para sustentar y agilizar la reclamación te pedimos,
          antes de abrir o desechar el empaque:
        </p>
        <ul>
          <li>Fotos del paquete cerrado o abierto, incluida la guía de envío.</li>
          <li>Fotos del producto y del daño o faltante.</li>
          <li>Video de la apertura, si lo tienes.</li>
        </ul>
        <p>
          Northéa evaluará cada caso con la evidencia disponible y puede pedirte más información. Avisa por
          WhatsApp o correo lo antes posible.
        </p>

        <h2 className="legal-h2">9. Cancelación en 24 horas y derecho de revocación</h2>
        <p>
          <strong>Cancelación dentro de las primeras 24 horas.</strong> En caso de que el cliente solicite cancelar
          una compra dentro de las primeras 24 horas posteriores a la confirmación del pedido, Northéa gestionará
          la cancelación conforme a las condiciones aplicables a la operación. Cuando resulte procedente la
          cancelación y existan costos de procesamiento, operación o servicios asociados a la transacción que sean
          legalmente trasladables al cliente, éstos podrán ser descontados del importe a reembolsar, previa
          información al cliente y de conformidad con la legislación aplicable.
        </p>
        <p>
          <strong>Derecho de revocación.</strong> Esta política comercial de cancelación no sustituye ni limita el
          derecho que la Ley Federal de Protección al Consumidor te da en compras a distancia: puedes revocar tu
          compra dentro de los 5 días hábiles siguientes a la entrega del producto, sin necesidad de dar explicación
          ni pagar penalización. Para ejercerlo, avisa a Northéa por WhatsApp o correo dentro de ese plazo.
        </p>
        <p>
          Si ejerces la revocación, Northéa te reembolsa el precio pagado. El costo de flete y seguro de devolución
          corre por tu cuenta. El producto debe regresar en las mismas condiciones en que lo recibiste: nuevo, sin
          uso, sin lavar y con sus etiquetas.
        </p>
        <p>
          <strong>Reembolsos.</strong> Se hacen por el mismo medio de pago que usaste, una vez que Northéa recibe el
          producto y verifica que llegó en las condiciones descritas.
        </p>

        <h2 className="legal-h2">10. Devoluciones, defectos no informados y errores de Northéa</h2>
        <p>
          <strong>Regla general.</strong> Por tratarse de ropa de outlet, fuera del derecho de revocación (sección
          9) y de los casos de esta sección, Northéa no acepta devoluciones ni cambios por talla, color, gusto o
          arrepentimiento. Esto no limita ningún derecho que la ley te reconozca como consumidor.
        </p>
        <p>
          <strong>Producto con defecto no informado.</strong> Si recibes una pieza con un defecto que no se informó
          antes de la compra, avisa por WhatsApp o correo electrónico en un plazo no mayor a 24 horas desde la
          entrega, con fotos o video del defecto. Northéa abre una investigación: compara lo que recibiste con las
          fotografías reales que tiene de cada pieza, desde varios ángulos, y te da su resolución. Las resoluciones
          posibles son:
        </p>
        <table className="legal-table">
          <tbody>
            <tr><th>Procede</th><td>Las fotografías originales muestran que el defecto ya existía al enviar la pieza. Eliges entre cambio (si hay disponibilidad), crédito en tienda o reembolso. Northéa cubre el envío de regreso.</td></tr>
            <tr><th>No procede</th><td>El defecto no aparece en las fotografías originales o pudo originarse después de la entrega (uso, lavado, alteraciones). Northéa te explica su resolución con las fotografías como respaldo.</td></tr>
            <tr><th>Evidencia insuficiente</th><td>Con lo enviado no se puede determinar el origen del defecto. Northéa puede pedirte más fotos o video antes de resolver.</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Error de Northéa.</strong> Si Northéa envía un producto, talla, modelo o color distinto al que
          pediste, investiga el pedido contigo y, si se confirma el error, ofrece estas opciones:
        </p>
        <ol>
          <li>Cambio por la pieza correcta, si hay disponibilidad.</li>
          <li>Crédito en tienda por el valor de la pieza, que es la opción que Northéa ofrece primero.</li>
          <li>Reembolso, si prefieres esa opción; no estás obligado a aceptar el crédito.</li>
        </ol>
        <p>
          Northéa cubre el costo del envío de regreso. Para completar el cambio, el crédito o el reembolso, la
          pieza debe regresar a Northéa en las mismas condiciones en que se envió, y Northéa la revisa al recibirla.
        </p>
        <p>
          <strong>Producto devuelto con daños.</strong> Si la pieza regresa con daños o en condiciones distintas a
          las entregadas, Northéa te lo informa con fotografías y puede acordar contigo una solución, que puede
          incluir un descuento proporcional al daño, siempre informada previamente y conforme a la ley.
        </p>

        <h2 className="legal-h2">11. Corrección de errores y negativa a tramitar pedidos</h2>
        <p>
          <strong>Antes de pagar.</strong> Durante la compra puedes revisar tu carrito y modificar los productos,
          cantidades y datos de entrega. Revisa todo con cuidado antes de pagar.
        </p>
        <p>
          <strong>Después de pagar.</strong> Si detectas un error en tus datos de contacto o de entrega, avisa de
          inmediato por WhatsApp o correo electrónico. Northéa lo corregirá si el pedido todavía no ha sido enviado.
        </p>
        <p>
          <strong>Pedidos que Northéa puede rechazar o cancelar.</strong> Northéa puede rechazar o cancelar un
          pedido por falta de disponibilidad de la pieza, sospecha razonable de fraude, información falsa o
          circunstancias excepcionales. Siempre se te notifica y se te reembolsa el importe total pagado.
        </p>

        <h2 className="legal-h2">12. Entrega, riesgo y propiedad de los productos</h2>
        <p>
          Se considera que el pedido fue entregado cuando tú, o la persona que designaste, recibe físicamente el
          paquete en la dirección indicada.
        </p>
        <p>
          Hasta la entrega, el riesgo de pérdida o daño durante el envío es de Northéa, conforme a las secciones 7 y
          8. A partir de la entrega, el producto queda bajo tu responsabilidad.
        </p>
        <p>
          La propiedad del producto pasa a ti cuando Northéa recibe el pago completo o cuando se entrega, lo que
          ocurra después.
        </p>

        <h2 className="legal-h2">13. Responsabilidad y conformidad del producto</h2>
        <p>
          <strong>Conformidad.</strong> Northéa entrega productos que corresponden a la descripción, las fotografías
          y las condiciones informadas en el sitio o por WhatsApp. Si no corresponden, aplica la sección 10.
        </p>
        <p>
          <strong>Límite de responsabilidad.</strong> En la medida permitida por la ley, la responsabilidad de
          Northéa por un producto se limita al precio pagado por él, y Northéa no responde por pérdidas indirectas
          como pérdida de ventas, ingresos o tiempo. Nada en estos términos excluye ni limita los derechos
          irrenunciables que la Ley Federal de Protección al Consumidor te reconoce, ni la responsabilidad por dolo
          o fraude.
        </p>
        <p>
          <strong>Seguridad del sitio.</strong> No debes introducir virus ni software dañino, intentar accesos no
          autorizados ni realizar ataques al sitio. Northéa puede suspender el acceso y dar aviso a las autoridades
          en caso de incumplimiento.
        </p>
        <p>
          <strong>Enlaces de terceros.</strong> Si el sitio contiene enlaces a otros sitios, son solo informativos.
          Northéa no controla su contenido y no es responsable por su uso.
        </p>

        <h2 className="legal-h2">14. Comunicaciones y notificaciones</h2>
        <p>
          Al comprar aceptas que Northéa se comunique contigo por medios electrónicos: correo electrónico, WhatsApp
          y avisos en el sitio. Estas comunicaciones cumplen el requisito de forma escrita.
        </p>
        <p>
          Para enviar una notificación a Northéa usa los medios oficiales: WhatsApp (+52 55 2397 6633) o{' '}
          <a href="mailto:northea.co@gmail.com">northea.co@gmail.com</a>. Las notificaciones por correo o WhatsApp se
          consideran recibidas al momento de su envío, y las publicadas en el sitio, al momento de su publicación.
        </p>

        <h2 className="legal-h2">15. Comentarios, quejas y reclamaciones</h2>
        <p>
          Tus comentarios y sugerencias son bienvenidos. Envía cualquier consulta, queja o reclamación por WhatsApp
          o correo electrónico. Cada queja se registra con un folio de seguimiento que Northéa te proporciona, y se
          atiende en el menor tiempo posible y dentro de los plazos que marque la ley.
        </p>
        <p>
          Si consideras que tus derechos como consumidor no fueron respetados, puedes acudir a la Procuraduría
          Federal del Consumidor (PROFECO).
        </p>

        <h2 className="legal-h2">16. Disposiciones generales</h2>
        <p>
          <strong>Cesión.</strong> No puedes ceder ni transferir tu compra o tus derechos derivados de ella sin
          autorización por escrito de Northéa. Northéa puede cederlos, sin afectar tus derechos como consumidor.
        </p>
        <p>
          <strong>No renuncia.</strong> Que Northéa no exija en algún momento el cumplimiento estricto de estos
          términos no significa que renuncie a ese derecho.
        </p>
        <p><strong>Nulidad parcial.</strong> Si alguna cláusula se declara nula, las demás siguen vigentes.</p>
        <p>
          <strong>Acuerdo completo.</strong> Estos términos, junto con el Aviso de Privacidad y las condiciones de
          cada promoción, forman el acuerdo completo entre Northéa y el cliente.
        </p>

        <h2 className="legal-h2">17. Propiedad intelectual, privacidad, atención, fuerza mayor, modificaciones y jurisdicción</h2>
        <p>
          <strong>Propiedad intelectual.</strong> El nombre Northéa, el logotipo, las fotografías, los videos, los
          textos, los diseños y demás contenidos del sitio son propiedad de Northéa. No puedes copiarlos,
          reproducirlos ni usarlos con fines comerciales sin autorización por escrito.
        </p>
        <p>
          <strong>Privacidad.</strong> Tus datos personales se tratan conforme al{' '}
          <a href="/aviso-privacidad">Aviso de Privacidad</a> de Northéa, que puedes consultar en northea.cc.
        </p>
        <h3 className="legal-h3">Atención al cliente</h3>
        <table className="legal-table">
          <tbody>
            <tr><th>Lunes a viernes</th><td>9:00 a.m. a 6:00 p.m.</td></tr>
            <tr><th>Sábado</th><td>9:00 a.m. a 1:00 p.m.</td></tr>
          </tbody>
        </table>
        <p>
          Los únicos medios oficiales de atención son WhatsApp (+52 55 2397 6633) y el correo{' '}
          northea.co@gmail.com. Las reclamaciones, dudas y aclaraciones se atienden por estos medios.
        </p>
        <p>
          <strong>Fuerza mayor.</strong> Northéa no es responsable por retrasos o incumplimientos causados por
          hechos fuera de su control razonable, como desastres naturales, fallas de servicios de internet o de
          pago, paros de paqueterías, disposiciones de autoridad o cualquier otro caso fortuito o de fuerza mayor.
          Northéa te informará y buscará una solución, incluido el reembolso cuando corresponda.
        </p>
        <p>
          <strong>Modificaciones.</strong> Northéa puede actualizar estos términos en cualquier momento. Los cambios
          aplican a las compras realizadas después de su publicación en el sitio; tu compra se rige por los
          términos vigentes al momento de hacerla.
        </p>
        <p>
          <strong>Legislación y jurisdicción.</strong> Estos términos se rigen por las leyes de los Estados Unidos
          Mexicanos, en particular la Ley Federal de Protección al Consumidor. Para cualquier controversia, puedes
          acudir a la Procuraduría Federal del Consumidor (PROFECO) y, en su caso, a los tribunales competentes en
          México. Las partes renuncian a cualquier otra jurisdicción que pudiera corresponderles por razón de su
          domicilio presente o futuro.
        </p>

        <div className="legal-annex">
          <h2 className="legal-h2">Anexo. Formato de revocación de compra</h2>
          <p>
            Puedes usar este formato o avisar por WhatsApp o correo. No es obligatorio. Envíalo dentro de los 5 días
            hábiles siguientes a la entrega.
          </p>
          <p>
            Para: Northéa (Lucero Herrera Hernández), <a href="mailto:northea.co@gmail.com">northea.co@gmail.com</a>,
            WhatsApp +52 55 2397 6633.
          </p>
          <p>Por la presente informo que revoco mi compra de los siguientes productos:</p>
          <dl>
            <dt>Número o fecha de pedido:</dt><dd></dd>
            <dt>Fecha de entrega:</dt><dd></dd>
            <dt>Productos:</dt><dd></dd>
            <dt>Nombre del cliente:</dt><dd></dd>
            <dt>Domicilio del cliente:</dt><dd></dd>
            <dt>Fecha:</dt><dd></dd>
          </dl>
        </div>

        <p className="legal-note">Consulta también nuestro <a href="/aviso-privacidad">Aviso de Privacidad</a>.</p>
      </main>
    </>
  )
}
