import { Link, useNavigate } from 'react-router-dom'

import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineLogout,
} from 'react-icons/hi'

import { useAuth } from '../../context/AuthContext'

function DashboardLayout({ children }) {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/login')
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 flex">

      {/* Sidebar */}
      <aside className="w-[280px] bg-zinc-900 border-r border-white/10 p-6 hidden lg:flex flex-col">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-3xl font-black text-white"
        >
          SaaS
          <span className="text-blue-500">
            Pro
          </span>
        </Link>

        {/* Navigation */}
        <nav className="mt-12 flex flex-col gap-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-blue-600 hover:text-white transition"
          >
            <HiOutlineHome className="text-2xl" />
            Dashboard
          </Link>

          <Link
            to="/inventory"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-blue-600 hover:text-white transition"
          >
            <HiOutlineCube className="text-2xl" />
            Inventario
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-blue-600 hover:text-white transition"
          >
            <HiOutlineClipboardList className="text-2xl" />
            Pedidos
          </Link>

          <Link
            to="/invoices"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-blue-600 hover:text-white transition"
          >
            <HiOutlineDocumentText className="text-2xl" />
            Facturas
          </Link>

          <Link
            to="/user"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-300 hover:bg-blue-600 hover:text-white transition"
          >
            <HiOutlineUser className="text-2xl" />
            Usuario
          </Link>

        </nav>

        {/* Bottom */}
        <div className="mt-auto">

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-4
              px-5 py-4 rounded-2xl
              bg-red-500/10 hover:bg-red-500/20
              text-red-400 transition
            "
          >

            <HiOutlineLogout className="text-2xl" />

            Cerrar sesión

          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-24 border-b border-white/10 bg-zinc-950 px-8 flex items-center justify-between">

          <div>

            <h1 className="text-white text-3xl font-black">
              Hola, {user?.firstName} 👋
            </h1>

            <p className="text-zinc-500 mt-1">
              Bienvenido nuevamente
            </p>

          </div>

          {/* User */}
          <div className="flex items-center gap-4">

            <div className="text-right">

              <h4 className="text-white font-bold">
                {user?.firstName}
              </h4>

              <p className="text-zinc-500 text-sm">
                Administrador
              </p>

            </div>

            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl">

              {user?.firstName?.charAt(0)}

            </div>

          </div>

        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>

      </main>

    </div>
  )
}

export default DashboardLayout