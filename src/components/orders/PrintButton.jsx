import jsPDF from 'jspdf'

function PrintButton({ sale }) {
  const handleGeneratePDF = () => {
    const doc = new jsPDF()

    // ======================
    // HEADER
    // ======================

    doc.setFontSize(24)

    doc.text(
      'FACTURA',
      20,
      25
    )

    doc.setFontSize(12)

    doc.text(
      `Factura ID: ${sale.id}`,
      20,
      40
    )

    doc.text(
      `Fecha: ${sale.date}`,
      20,
      50
    )

    doc.text(
      `Estado: ${
        sale.status || 'Pendiente'
      }`,
      20,
      60
    )

    // ======================
    // CLIENTE
    // ======================

    doc.setFontSize(18)

    doc.text(
      'Datos del cliente',
      20,
      85
    )

    doc.setFontSize(12)

    doc.text(
      `Nombre: ${
        sale.client.name || '-'
      }`,
      20,
      100
    )

    doc.text(
      `Teléfono: ${
        sale.client.phone || '-'
      }`,
      20,
      110
    )

    doc.text(
      `Email: ${
        sale.client.email || '-'
      }`,
      20,
      120
    )

    doc.text(
      `DNI/CUIT: ${
        sale.client.dni || '-'
      }`,
      20,
      130
    )

    doc.text(
      `Dirección: ${
        sale.client.address || '-'
      }`,
      20,
      140
    )

    // ======================
    // PAGO
    // ======================

    doc.setFontSize(18)

    doc.text(
      'Método de pago',
      20,
      165
    )

    doc.setFontSize(12)

    doc.text(
      `${sale.paymentMethod}`,
      20,
      178
    )

    // ======================
    // PRODUCTOS
    // ======================

    let y = 205

    doc.setFontSize(18)

    doc.text(
      'Productos',
      20,
      y
    )

    y += 15

    doc.setFontSize(12)

    sale.products.forEach((product) => {
      doc.text(
        `${product.name} x${product.quantity}`,
        20,
        y
      )

      doc.text(
        `$${Number(
          product.price *
            product.quantity
        ).toLocaleString()}`,
        150,
        y
      )

      y += 12
    })

    // ======================
    // TOTAL
    // ======================

    y += 15

    doc.setFontSize(22)

    doc.text(
      `TOTAL: $${Number(
        sale.total
      ).toLocaleString()}`,
      20,
      y
    )

    // ======================
    // FOOTER
    // ======================

    y += 25

    doc.setFontSize(10)

    doc.text(
      'Gracias por su compra.',
      20,
      y
    )

    doc.text(
      'Sistema de gestión generado con React + Tailwind.',
      20,
      y + 8
    )

    // ======================
    // SAVE
    // ======================

    doc.save(
      `Factura-${sale.id}.pdf`
    )
  }

  return (
    <button
      onClick={handleGeneratePDF}
      className="
        h-12 px-5 rounded-2xl
        bg-blue-600 hover:bg-blue-700
        transition
        text-white font-bold
      "
    >
      Descargar PDF
    </button>
  )
}

export default PrintButton