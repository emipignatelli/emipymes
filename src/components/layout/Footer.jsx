import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* Logo */}
        <div>

          <Link
            to="/"
            className="text-3xl font-black text-white"
          >
            SaaS<span className="text-blue-500">Pro</span>
          </Link>

          <p className="text-zinc-500 mt-6 leading-relaxed">
            Plataforma moderna para gestión de ventas,
            stock, presupuestos y facturación.
          </p>

        </div>

        {/* Navegación */}
        <div>

          <h4 className="text-white font-bold text-lg mb-5">
            Navegación
          </h4>

          <div className="flex flex-col gap-4">

            <a
              href="#features"
              className="text-zinc-400 hover:text-white transition"
            >
              Funciones
            </a>

            <a
              href="#pricing"
              className="text-zinc-400 hover:text-white transition"
            >
              Precios
            </a>

            <a
              href="#faq"
              className="text-zinc-400 hover:text-white transition"
            >
              FAQ
            </a>

          </div>

        </div>

        {/* Empresa */}
        <div>

          <h4 className="text-white font-bold text-lg mb-5">
            Empresa
          </h4>

          <div className="flex flex-col gap-4">

            <button className="text-left text-zinc-400 hover:text-white transition">
              Sobre nosotros
            </button>

            <button className="text-left text-zinc-400 hover:text-white transition">
              Contacto
            </button>

            <button className="text-left text-zinc-400 hover:text-white transition">
              Soporte
            </button>

          </div>

        </div>

        {/* Legal */}
        <div>

          <h4 className="text-white font-bold text-lg mb-5">
            Legal
          </h4>

          <div className="flex flex-col gap-4">

            <button className="text-left text-zinc-400 hover:text-white transition">
              Términos
            </button>

            <button className="text-left text-zinc-400 hover:text-white transition">
              Privacidad
            </button>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

        <p className="text-zinc-500 text-sm">
          © 2026 SaaSPro. Todos los derechos reservados.
        </p>

        <p className="text-zinc-600 text-sm">
          Desarrollado con React + Vite + Tailwind
        </p>

      </div>

    </footer>
  )
}

export default Footer