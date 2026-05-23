import { useMemo } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'

import {
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineCreditCard,
} from 'react-icons/hi'

function InvoicesPage() {
  // Ventas guardadas
  const sales =
    JSON.parse(localStorage.getItem('sales')) || []

  // Total vendido
  const totalSales = useMemo(() => {
    return sales.reduce(
      (acc, sale) => acc + sale.total,
      0
    )
  }, [sales])

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-white text-4xl font-black">
          Facturación
        </h1>

        <p className="text-zinc-500 mt-3">
          Historial completo de ventas y facturas.
        </p>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Cantidad */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <p className="text-zinc-500">
            Cantidad de ventas
          </p>

          <h2 className="text-white text-5xl font-black mt-4">
            {sales.length}
          </h2>

        </div>

        {/* Total */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <p className="text-zinc-500">
            Total facturado
          </p>

          <h2 className="text-green-400 text-5xl font-black mt-4">
            $
            {Number(totalSales).toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Lista ventas */}
      <div className="space-y-6">

        {sales.length === 0 ? (
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-zinc-900
              p-12
              text-center
            "
          >

            <h2 className="text-white text-2xl font-bold">
              No hay ventas registradas
            </h2>

            <p className="text-zinc-500 mt-3">
              Las ventas aparecerán acá automáticamente.
            </p>

          </div>
        ) : (
          sales
            .slice()
            .reverse()
            .map((sale) => (
              <div
                key={sale.id}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-zinc-900
                  p-6
                "
              >

                {/* Top */}
                <div
                  className="
                    flex flex-col xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-6
                    border-b border-white/10
                    pb-6
                  "
                >

                  <div>

                    <div className="flex items-center gap-3">

                      <HiOutlineDocumentText className="text-3xl text-blue-400" />

                      <h2 className="text-white text-2xl font-bold">
                        Venta #{sale.id}
                      </h2>

                    </div>

                    <div className="flex flex-wrap gap-6 mt-5">

                      <div className="flex items-center gap-2 text-zinc-400">

                        <HiOutlineUser />

                        {sale.client.name}

                      </div>

                      <div className="flex items-center gap-2 text-zinc-400">

                        <HiOutlineCalendar />

                        {sale.date}

                      </div>

                      <div className="flex items-center gap-2 text-zinc-400">

                        <HiOutlineCreditCard />

                        {sale.paymentMethod}

                      </div>

                    </div>

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Total
                    </p>

                    <h3 className="text-green-400 text-4xl font-black mt-2">
                      $
                      {Number(
                        sale.total
                      ).toLocaleString()}
                    </h3>

                  </div>

                </div>

                {/* Productos */}
                <div className="mt-8">

                  <h3 className="text-white text-xl font-bold mb-5">
                    Productos vendidos
                  </h3>

                  <div className="space-y-4">

                    {sale.products.map(
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

              </div>
            ))
        )}

      </div>

    </DashboardLayout>
  )
}

export default InvoicesPage