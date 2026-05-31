import { useMemo } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'

import SalesChart from '../../components/dashboard/SalesChart'
import TopProducts from '../../components/dashboard/TopProducts'

import { useAuth } from '../../context/AuthContext'

import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineExclamation,
} from 'react-icons/hi'

function DashboardHome() {
  const { user } = useAuth()

  // Productos por usuario
  const products =
    JSON.parse(
      localStorage.getItem(
        `products_${user?.email}`
      )
    ) || []

  // Ventas por usuario
  const sales =
    JSON.parse(
      localStorage.getItem(
        `sales_${user?.email}`
      )
    ) || []

  // Total vendido
  const totalRevenue = useMemo(() => {
    return sales.reduce(
      (acc, sale) => acc + sale.total,
      0
    )
  }, [sales])

  // Sin stock
  const outOfStock = products.filter(
    (product) => product.stock <= 0
  )

  // Stock bajo
  const lowStock = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 5
  )

  return (
    <DashboardLayout>

      {/* KPIs */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {/* Total vendido */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Total vendido
              </p>

              <h2 className="text-green-400 text-4xl font-black mt-4">
                $
                {Number(
                  totalRevenue
                ).toLocaleString()}
              </h2>

            </div>

            <div
              className="
                w-16 h-16 rounded-2xl
                bg-green-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineCurrencyDollar className="text-4xl text-green-400" />

            </div>

          </div>

        </div>

        {/* Ventas */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Ventas realizadas
              </p>

              <h2 className="text-white text-4xl font-black mt-4">
                {sales.length}
              </h2>

            </div>

            <div
              className="
                w-16 h-16 rounded-2xl
                bg-blue-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineShoppingCart className="text-4xl text-blue-400" />

            </div>

          </div>

        </div>

        {/* Productos */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Productos
              </p>

              <h2 className="text-white text-4xl font-black mt-4">
                {products.length}
              </h2>

            </div>

            <div
              className="
                w-16 h-16 rounded-2xl
                bg-purple-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineCube className="text-4xl text-purple-400" />

            </div>

          </div>

        </div>

        {/* Alertas */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Alertas stock
              </p>

              <h2 className="text-red-400 text-4xl font-black mt-4">
                {outOfStock.length +
                  lowStock.length}
              </h2>

            </div>

            <div
              className="
                w-16 h-16 rounded-2xl
                bg-red-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineExclamation className="text-4xl text-red-400" />

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="grid xl:grid-cols-2 gap-8">

        {/* Últimas ventas */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <h2 className="text-white text-2xl font-bold mb-8">
            Últimas ventas
          </h2>

          <div className="space-y-4">

            {sales.length === 0 ? (
              <div className="rounded-2xl bg-zinc-950 p-6">

                <p className="text-zinc-500">
                  No hay ventas registradas.
                </p>

              </div>
            ) : (
              sales
                .slice()
                .reverse()
                .slice(0, 5)
                .map((sale) => (
                  <div
                    key={sale.id}
                    className="
                      rounded-2xl
                      bg-zinc-950
                      border border-white/5
                      p-5
                      flex items-center justify-between
                    "
                  >

                    <div>

                      <h3 className="text-white font-bold">
                        {sale.client.name}
                      </h3>

                      <p className="text-zinc-500 mt-1 text-sm">
                        {sale.date}
                      </p>

                    </div>

                    <h4 className="text-green-400 text-xl font-black">
                      $
                      {Number(
                        sale.total
                      ).toLocaleString()}
                    </h4>

                  </div>
                ))
            )}

          </div>

        </div>

        {/* Alertas stock */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <h2 className="text-white text-2xl font-bold mb-8">
            Alertas de stock
          </h2>

          <div className="space-y-4">

            {[...outOfStock, ...lowStock]
              .slice(0, 6)
              .map((product, index) => (
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

                    <h3 className="text-white font-bold">
                      {product.name}
                    </h3>

                    <p className="text-zinc-500 mt-1">
                      Stock:
                      {' '}
                      {product.stock}
                    </p>

                  </div>

                  <div
                    className={`
                      px-4 py-2 rounded-xl text-sm font-bold
                      ${
                        product.stock <= 0
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }
                    `}
                  >

                    {product.stock <= 0
                      ? 'Sin stock'
                      : 'Stock bajo'}

                  </div>

                </div>
              ))}

            {outOfStock.length === 0 &&
              lowStock.length === 0 && (
                <div className="rounded-2xl bg-zinc-950 p-6">

                  <p className="text-zinc-500">
                    Todo el stock está correcto.
                  </p>

                </div>
              )}

          </div>

        </div>

      </div>

      {/* Gráfico */}
      <div className="mt-8">

        <SalesChart
          sales={sales}
        />

      </div>

      {/* Top productos */}
      <div className="mt-8">

        <TopProducts
          sales={sales}
        />

      </div>

    </DashboardLayout>
  )
}

export default DashboardHome