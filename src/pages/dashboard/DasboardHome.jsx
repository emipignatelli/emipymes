import DashboardLayout from '../../components/layout/DashboardLayout'

function DashboardHome() {
  return (
    <DashboardLayout>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Ventas del mes
          </p>

          <h2 className="text-white text-4xl font-black mt-4">
            $2.450.000
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Pedidos
          </p>

          <h2 className="text-white text-4xl font-black mt-4">
            1.284
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Productos
          </p>

          <h2 className="text-white text-4xl font-black mt-4">
            386
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Stock crítico
          </p>

          <h2 className="text-red-400 text-4xl font-black mt-4">
            12
          </h2>
        </div>

      </div>

    </DashboardLayout>
  )
}

export default DashboardHome