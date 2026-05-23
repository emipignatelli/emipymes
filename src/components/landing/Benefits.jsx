import { motion } from 'framer-motion'

function Benefits() {
  return (
    <section className="w-full bg-zinc-900 px-6 py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <span className="text-blue-500 font-semibold">
            BENEFICIOS
          </span>

          <h2 className="text-white text-5xl font-black mt-4 leading-tight">
            Ahorrá tiempo y organizá tu negocio
          </h2>

          <p className="text-zinc-400 text-lg mt-8 leading-relaxed">
            Centralizá inventario, ventas, facturación y control
            de stock en una sola plataforma moderna y fácil de usar.
          </p>

          <div className="mt-10 space-y-6">

            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />

              <div>
                <h4 className="text-white text-xl font-bold">
                  Control total
                </h4>

                <p className="text-zinc-400 mt-2">
                  Visualizá ventas, productos y stock en tiempo real.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />

              <div>
                <h4 className="text-white text-xl font-bold">
                  Más velocidad
                </h4>

                <p className="text-zinc-400 mt-2">
                  Generá presupuestos y facturas en segundos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />

              <div>
                <h4 className="text-white text-xl font-bold">
                  Desde cualquier dispositivo
                </h4>

                <p className="text-zinc-400 mt-2">
                  Totalmente responsive para PC, tablet y celular.
                </p>
              </div>
            </div>

          </div>

        </motion.div>

        {/* Derecha */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-blue-600/20 blur-[120px]" />

          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            {/* Barra superior */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <div className="w-4 h-4 rounded-full bg-green-500" />
            </div>

            {/* Contenido fake dashboard */}
            <div className="space-y-6">

              <div className="rounded-2xl bg-zinc-950 p-6">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-zinc-400 text-sm">
                      Ventas totales
                    </p>

                    <h3 className="text-white text-4xl font-black mt-2">
                      $8.450.000
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold">
                    +18%
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-zinc-950 p-5">
                  <p className="text-zinc-400 text-sm">
                    Pedidos
                  </p>

                  <h3 className="text-white text-3xl font-black mt-2">
                    1.248
                  </h3>
                </div>

                <div className="rounded-2xl bg-zinc-950 p-5">
                  <p className="text-zinc-400 text-sm">
                    Productos
                  </p>

                  <h3 className="text-white text-3xl font-black mt-2">
                    386
                  </h3>
                </div>

              </div>

              <div className="rounded-2xl bg-zinc-950 p-5">
                <p className="text-zinc-400 text-sm mb-4">
                  Rendimiento
                </p>

                <div className="w-full h-4 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="w-[78%] h-full bg-blue-500 rounded-full" />
                </div>

                <p className="text-zinc-500 text-sm mt-3">
                  78% de crecimiento mensual
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  )
}

export default Benefits