import { useMemo, useState } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'

import PrintButton from '../../components/orders/PrintButton'

import {
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineSearch,
} from 'react-icons/hi'

import toast from 'react-hot-toast'

function InvoicesPage() {
  // Estado local de ventas
  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem('sales')) || []
  )

  // Buscador
  const [search, setSearch] = useState('')

  // Filtro
  const [filter, setFilter] =
    useState('Todas')

  // Total vendido
  const totalSales = useMemo(() => {
    return sales.reduce(
      (acc, sale) => acc + sale.total,
      0
    )
  }, [sales])

  // Filtrar ventas
  const filteredSales = sales.filter((sale) => {
    const clientName =
      sale.client.name.toLowerCase()

    const saleId =
      String(sale.id)

    const matchesSearch =
      clientName.includes(
        search.toLowerCase()
      ) ||
      saleId.includes(search)

    const matchesFilter =
      filter === 'Todas'
        ? true
        : (sale.status || 'Pendiente') ===
          filter

    return matchesSearch && matchesFilter
  })

  // Marcar como pagada
  const handleMarkAsPaid = (saleId) => {
    const updatedSales = sales.map((sale) =>
      sale.id === saleId
        ? {
            ...sale,
            status: 'Pagada',
          }
        : sale
    )

    setSales(updatedSales)

    localStorage.setItem(
      'sales',
      JSON.stringify(updatedSales)
    )

    toast.success('Factura marcada como pagada')
  }

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

      {/* Search */}
      <div className="mb-8">

        <div className="relative max-w-xl">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xl">

            <HiOutlineSearch />

          </span>

          <input
            type="text"
            placeholder="Buscar por cliente o número de venta..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full h-14 rounded-2xl
              bg-zinc-900 border border-white/10
              pl-12 pr-4
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">

        <button
          onClick={() => setFilter('Todas')}
          className={`
            h-12 px-5 rounded-2xl font-bold transition
            ${
              filter === 'Todas'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-900 text-zinc-400'
            }
          `}
        >
          Todas
        </button>

        <button
          onClick={() => setFilter('Pendiente')}
          className={`
            h-12 px-5 rounded-2xl font-bold transition
            ${
              filter === 'Pendiente'
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-900 text-zinc-400'
            }
          `}
        >
          Pendientes
        </button>

        <button
          onClick={() => setFilter('Pagada')}
          className={`
            h-12 px-5 rounded-2xl font-bold transition
            ${
              filter === 'Pagada'
                ? 'bg-green-600 text-white'
                : 'bg-zinc-900 text-zinc-400'
            }
          `}
        >
          Pagadas
        </button>

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

        {filteredSales.length === 0 ? (
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
              No se encontraron ventas
            </h2>

            <p className="text-zinc-500 mt-3">
              Probá con otro término de búsqueda.
            </p>

          </div>
        ) : (
          filteredSales
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

                    <div className="flex flex-wrap items-center gap-3">

                      <HiOutlineDocumentText className="text-3xl text-blue-400" />

                      <h2 className="text-white text-2xl font-bold">
                        Venta #{sale.id}
                      </h2>

                      {/* Estado */}
                      <span
                        className={`
                          px-4 py-2 rounded-full text-sm font-bold
                          ${
                            sale.status === 'Pagada'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }
                        `}
                      >
                        {sale.status || 'Pendiente'}
                      </span>

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

                  <div className="flex flex-col items-start xl:items-end gap-4">

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

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">

                      {/* Pagada */}
                      {sale.status !== 'Pagada' && (
                        <button
                          onClick={() =>
                            handleMarkAsPaid(sale.id)
                          }
                          className="
                            h-12 px-5 rounded-2xl
                            bg-green-600 hover:bg-green-700
                            transition
                            text-white font-bold
                            flex items-center gap-2
                          "
                        >

                          <HiOutlineCheckCircle className="text-xl" />

                          Marcar pagada

                        </button>
                      )}

                      {/* Print */}
                      <PrintButton sale={sale} />

                    </div>

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