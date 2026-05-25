import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'

const generatePDF = (sale) => {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(24)

  doc.text('FACTURA', 14, 20)

  doc.setFontSize(12)

  doc.text(
    `Fecha: ${sale.date}`,
    14,
    30
  )

  doc.text(
    `Cliente: ${sale.client.name}`,
    14,
    38
  )

  doc.text(
    `Telefono: ${sale.client.phone}`,
    14,
    46
  )

  doc.text(
    `Email: ${sale.client.email}`,
    14,
    54
  )

  doc.text(
    `Metodo de pago: ${sale.paymentMethod}`,
    14,
    62
  )

  // Tabla productos
  autoTable(doc, {
    startY: 75,

    head: [
      [
        'Producto',
        'Cantidad',
        'Precio',
        'Subtotal',
      ],
    ],

    body: sale.products.map(
      (product) => [
        product.name,

        product.quantity,

        `$${product.price.toLocaleString()}`,

        `$${(
          product.price *
          product.quantity
        ).toLocaleString()}`,
      ]
    ),
  })

  // Total
  const finalY = doc.lastAutoTable.finalY + 15

  doc.setFontSize(18)

  doc.text(
    `TOTAL: $${sale.total.toLocaleString()}`,
    14,
    finalY
  )

  // Descargar
  doc.save(
    `factura-${sale.id}.pdf`
  )
}

export default generatePDF