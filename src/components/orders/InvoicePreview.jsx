import {
  HiOutlinePrinter,
  HiOutlineDocumentDownload,
} from 'react-icons/hi'

import {
  FaWhatsapp,
} from 'react-icons/fa'

import generatePDF from '../../utils/generatePDF'

function InvoicePreview({
  latestSale,
}) {
  if (!latestSale) return null

  const handleWhatsApp = () => {
    const message = `
Hola ${latestSale.client.name} 👋

Tu compra fue realizada correctamente.

Total: $${latestSale.total.toLocaleString()}

Gracias por tu compra.
    `

    const phone =
      latestSale.client.phone.replace(/\D/g, '')

    const url = `https://wa.me/54${phone}?text=${encodeURIComponent(
      message
    )}`

    window.open(url, '_blank')
  }

  return (
    <div
      className="
        mt-6
        rounded-[28px]
        border border-white/10
        bg-zinc-900
        p-5 md:p-6
      "
    >

      {/* Header */}
      <div
        className="
          flex flex-col lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          pb-5
          border-b border-white/10
        "
      >

        <div>

          <h2 className="text-white text-2xl font-black">
            Factura generada
          </h2>

          <p className="text-zinc-500 text-sm mt-1">
            Venta registrada correctamente.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => window.print()}
            className="
              h-10 px-4 rounded-xl
              bg-blue-600 hover:bg-blue-700
              transition
              text-white text-sm font-semibold
              flex items-center gap-2
            "
          >

            <HiOutlinePrinter />

            Imprimir

          </button>

          <button
            onClick={() =>
              generatePDF(latestSale)
            }
            className="
              h-10 px-4 rounded-xl
              bg-green-600 hover:bg-green-700
              transition
              text-white text-sm font-semibold
              flex items-center gap-2
            "
          >

            <HiOutlineDocumentDownload />

            PDF

          </button>

          <button
            onClick={handleWhatsApp}
            className="
              h-10 px-4 rounded-xl
              bg-emerald-600 hover:bg-emerald-700
              transition
              text-white text-sm font-semibold
              flex items-center gap-2
            "
          >

            <FaWhatsapp />

            WhatsApp

          </button>

        </div>

      </div>

      {/* Datos */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">

        {/* Cliente */}
        <div
          className="
            rounded-2xl
            bg-zinc-950
            border border-white/5
            p-5
          "
        >

          <p className="text-zinc-500 text-xs uppercase tracking-wider">
            Cliente
          </p>

          <h3 className="text-white text-lg font-bold mt-3">
            {latestSale.client.name}
          </h3>

          <div className="mt-3 space-y-1">

            <p className="text-zinc-400 text-sm">
              {latestSale.client.phone}
            </p>

            <p className="text-zinc-400 text-sm">
              {latestSale.client.email}
            </p>

          </div>

        </div>

        {/* Venta */}
        <div
          className="
            rounded-2xl
            bg-zinc-950
            border border-white/5
            p-5
          "
        >

          <p className="text-zinc-500 text-xs uppercase tracking-wider">
            Información de venta
          </p>

          <div className="mt-3 space-y-3">

            <div>

              <p className="text-zinc-500 text-xs">
                Fecha
              </p>

              <p className="text-white font-semibold">
                {latestSale.date}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-xs">
                Medio de pago
              </p>

              <p className="text-white font-semibold">
                {latestSale.paymentMethod}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Productos */}
      <div className="mt-6">

        <h3 className="text-white text-xl font-bold mb-4">
          Productos vendidos
        </h3>

        <div className="space-y-3">

          {latestSale.products.map(
            (product, index) => (
              <div
                key={index}
                className="
                  rounded-xl
                  bg-zinc-950
                  border border-white/5
                  p-4
                  flex items-center justify-between
                "
              >

                <div>

                  <h4 className="text-white font-semibold">
                    {product.name}
                  </h4>

                  <p className="text-zinc-500 text-sm mt-1">
                    Cantidad: {product.quantity}
                  </p>

                </div>

                <h4 className="text-white font-bold">
                  $
                  {Number(
                    product.price *
                      product.quantity
                  ).toLocaleString()}
                </h4>

              </div>
            )
          )}

        </div>

      </div>

      {/* Total */}
      <div
        className="
          mt-6
          rounded-2xl
          bg-gradient-to-r
          from-blue-600/10
          to-green-600/10
          border border-white/10
          p-5
          flex items-center justify-between
        "
      >

        <div>

          <p className="text-zinc-400 text-sm">
            Total de la venta
          </p>

          <p className="text-zinc-500 text-xs mt-1">
            Importe final registrado
          </p>

        </div>

        <h3 className="text-white text-3xl font-black">
          $
          {Number(
            latestSale.total
          ).toLocaleString()}
        </h3>

      </div>

    </div>
  )
}

export default InvoicePreview