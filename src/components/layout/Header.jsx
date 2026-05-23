import { Link } from 'react-router-dom'
import { HiMenuAlt3 } from 'react-icons/hi'

function Header() {
  return (
    <header className="w-full h-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black text-white tracking-wide"
        >
          SaaS<span className="text-blue-500">Pro</span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-zinc-300 hover:text-white transition"
          >
            Funciones
          </a>

          <a
            href="#pricing"
            className="text-zinc-300 hover:text-white transition"
          >
            Precios
          </a>

          <a
            href="#faq"
            className="text-zinc-300 hover:text-white transition"
          >
            FAQ
          </a>
        </nav>

        {/* Botones Desktop */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            to="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Ingresar
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Empezar
          </Link>

        </div>

        {/* Mobile */}
        <button className="md:hidden text-white text-3xl">
          <HiMenuAlt3 />
        </button>

      </div>
    </header>
  )
}

export default Header