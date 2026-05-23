import {
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineClipboardList,
  HiOutlineArchive,
} from 'react-icons/hi'

const features = [
  {
    icon: <HiOutlineCube />,
    title: 'Inventario inteligente',
    description:
      'Gestioná productos, categorías y stock en tiempo real.',
  },

  {
    icon: <HiOutlineClipboardList />,
    title: 'Generación de pedidos',
    description:
      'Creá presupuestos y pedidos profesionales fácilmente.',
  },

  {
    icon: <HiOutlineDocumentText />,
    title: 'Facturación',
    description:
      'Preparado para integraciones futuras con ARCA.',
  },

  {
    icon: <HiOutlineCreditCard />,
    title: 'Medios de pago',
    description:
      'Registrá transferencias, efectivo y tarjetas.',
  },

  {
    icon: <HiOutlineArchive />,
    title: 'Historial completo',
    description:
      'Consultá ventas, pedidos y movimientos fácilmente.',
  },

  {
    icon: <HiOutlineChartBar />,
    title: 'Métricas',
    description:
      'Visualizá estadísticas y crecimiento de tu negocio.',
  },
]

function Features() {
  return (
    <section
      id="features"
      className="w-full bg-zinc-950 px-6 py-32"
    >

      <div className="max-w-7xl mx-auto">

        {/* Título */}
        <div className="text-center mb-20">

          <span className="text-blue-500 font-semibold">
            FUNCIONALIDADES
          </span>

          <h2 className="text-white text-5xl font-black mt-4">
            Todo lo que necesitás
          </h2>

          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
            Un sistema moderno pensado para negocios que necesitan
            control, velocidad y profesionalismo.
          </p>

        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-blue-500/30 transition duration-300 hover:-translate-y-2"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-white text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Features