import { HiCheck } from 'react-icons/hi'

const plans = [
  {
    title: 'Starter',
    price: '$9.999',
    description: 'Ideal para pequeños negocios.',
    features: [
      'Control de inventario',
      'Generación de pedidos',
      'Historial de ventas',
      'Soporte básico',
    ],
    highlighted: false,
  },

  {
    title: 'Pro',
    price: '$19.999',
    description: 'Perfecto para negocios en crecimiento.',
    features: [
      'Todo lo del Starter',
      'Facturación avanzada',
      'Estadísticas',
      'Exportación PDF',
      'Soporte prioritario',
    ],
    highlighted: true,
  },

  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Para empresas y equipos grandes.',
    features: [
      'Todo lo del Pro',
      'Multiusuarios',
      'Integraciones',
      'Soporte dedicado',
      'Funciones personalizadas',
    ],
    highlighted: false,
  },
]

function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-zinc-950 px-6 py-32"
    >

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">

          <span className="text-blue-500 font-semibold">
            PLANES
          </span>

          <h2 className="text-white text-5xl font-black mt-4">
            Elegí tu plan
          </h2>

          <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
            Escalá tu negocio con herramientas profesionales
            para ventas, stock y facturación.
          </p>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                rounded-3xl border p-10 relative overflow-hidden
                ${
                  plan.highlighted
                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                    : 'border-white/10 bg-white/5'
                }
              `}
            >

              {plan.highlighted && (
                <div className="absolute top-5 right-5 px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-bold">
                  MÁS POPULAR
                </div>
              )}

              <h3 className="text-white text-3xl font-black">
                {plan.title}
              </h3>

              <p className="text-zinc-400 mt-4">
                {plan.description}
              </p>

              <div className="mt-8 flex items-end gap-2">

                <h2 className="text-white text-5xl font-black">
                  {plan.price}
                </h2>

                {plan.price !== 'Custom' && (
                  <span className="text-zinc-400 mb-2">
                    /mes
                  </span>
                )}

              </div>

              {/* Features */}
              <div className="mt-10 space-y-5">

                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >

                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <HiCheck />
                    </div>

                    <p className="text-zinc-300">
                      {feature}
                    </p>

                  </div>
                ))}

              </div>

              {/* Button */}
              <button
                className={`
                  w-full mt-10 py-4 rounded-2xl font-bold transition
                  ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }
                `}
              >
                Comenzar
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Pricing