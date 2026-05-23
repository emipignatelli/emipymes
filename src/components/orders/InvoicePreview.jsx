import {
  HiOutlinePrinter,
} from 'react-icons/hi'

function InvoicePreview({
  latestSale,
}) {
  if (!latestSale) return null

  return (
    <div
      className="
        mt-8
        rounded-3xl
        border border-white/10
        bg-zinc-900
        p-6
      "
    >

      {/* Header */}
      <div
        className="
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
          border-b border-white/10
          pb-6
        "
      >

        <div>

          <h2 className="text-white text-3xl font-black">
            Factura generada
          </h2>

          <p className="text-zinc-500 mt-2">
            Venta finalizada correctamente.
          </p>

        </div>

        <button
          onClick={() => window.print()}
          className="
            h-12 px-6 rounded-2xl
            bg-blue-600 hover:bg-blue-700
            transition
            text-white font-bold
            flex items-center gap-2
          "
        >

          <HiOutlinePrinter />

          Imprimir

        </button>

      </div>

      {/* Cliente */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">

        <div>

          <p className="text-zinc-500 text-sm">
            Cliente
          </p>

          <h3 className="text-white text-xl font-bold mt-2">
            {latestSale.client.name}
          </h3>

          <p className="text-zinc-400 mt-2">
            {latestSale.client.phone}
          </p>

          <p className="text-zinc-400">
            {latestSale.client.email}
          </p>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            Fecha
          </p>

          <h3 className="text-white text-xl font-bold mt-2">
            {latestSale.date}
          </h3>

          <p className="text-zinc-500 text-sm mt-5">
            Medio de pago
          </p>

          <h4 className="text-white font-bold mt-2">
            {latestSale.paymentMethod}
          </h4>

        </div>

      </div>

      {/* Productos */}
      <div className="mt-10">

        <h3 className="text-white text-2xl font-bold mb-6">
          Productos
        </h3>

        <div className="space-y-4">

          {latestSale.products.map(
            (product, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  bg-zinc-950
                  border border-white/5
                  p-5
                  flex items-center justify-between
                "
              >

                <div>

                  <h4 className="text-white font-bold">
                    {product.name}
                  </h4>

                  <p className="text-zinc-400 mt-1">
                    Cantidad:
                    {' '}
                    {product.quantity}
                  </p>

                </div>

                <h4 className="text-white text-xl font-bold">
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
          mt-10
          rounded-2xl
          bg-zinc-950
          p-6
          flex items-center justify-between
        "
      >

        <p className="text-zinc-400 text-xl">
          Total final
        </p>

        <h3 className="text-white text-4xl font-black">
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