import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section className="w-full bg-zinc-950 px-6 py-32 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[150px]" />

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-12 md:p-20 text-center">

          <span className="text-blue-500 font-semibold">
            EMPEZÁ HOY
          </span>

          <h2 className="text-white text-5xl md:text-6xl font-black mt-6 leading-tight">
            Llevá tu negocio al siguiente nivel
          </h2>

          <p className="text-zinc-400 text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
            Organizá ventas, controlá stock y gestioná facturación
            desde una plataforma moderna y profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

            <Link
              to="/register"
              className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-lg"
            >
              Crear cuenta
            </Link>

            <Link
              to="/login"
              className="px-10 py-5 rounded-2xl border border-white/10 hover:border-white/30 transition text-white font-bold text-lg"
            >
              Iniciar sesión
            </Link>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CTA