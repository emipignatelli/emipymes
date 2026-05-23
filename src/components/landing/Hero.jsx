import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="w-full min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
            Gestión inteligente para negocios
          </span>

          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight mt-6">
            Controlá tu negocio desde un solo lugar
          </h1>

          <p className="text-zinc-400 text-lg mt-8 leading-relaxed max-w-xl">
            Gestioná inventario, ventas, presupuestos, facturación
            y control de stock de forma rápida, moderna y profesional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-center"
            >
              Empezar ahora
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:border-white/30 transition text-white font-bold text-center"
            >
              Iniciar sesión
            </Link>

          </div>

        </motion.div>

        {/* Card visual */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white text-2xl font-bold">
                Dashboard
              </h3>

              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400 text-sm">
                  Ventas del mes
                </p>

                <h2 className="text-white text-3xl font-black mt-2">
                  $2.4M
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400 text-sm">
                  Productos
                </p>

                <h2 className="text-white text-3xl font-black mt-2">
                  248
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400 text-sm">
                  Pedidos
                </p>

                <h2 className="text-white text-3xl font-black mt-2">
                  1.284
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400 text-sm">
                  Stock crítico
                </p>

                <h2 className="text-red-400 text-3xl font-black mt-2">
                  12
                </h2>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default Hero