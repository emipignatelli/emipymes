const testimonials = [
  {
    name: 'Martín Gómez',
    role: 'Dueño de distribuidora',
    text: 'El sistema nos permitió ordenar completamente el stock y acelerar las ventas.',
  },

  {
    name: 'Lucía Fernández',
    role: 'Emprendedora',
    text: 'Ahora puedo generar presupuestos y controlar pagos desde el celular.',
  },

  {
    name: 'Carlos Ruiz',
    role: 'Mayorista',
    text: 'La interfaz es rapidísima y súper fácil de usar. Nos ahorra muchísimo tiempo.',
  },
]

function Testimonials() {
  return (
    <section className="w-full bg-zinc-900 px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">

          <span className="text-blue-500 font-semibold">
            TESTIMONIOS
          </span>

          <h2 className="text-white text-5xl font-black mt-4">
            Negocios que ya crecieron
          </h2>

          <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
            Emprendedores y empresas que optimizaron su gestión
            usando nuestra plataforma.
          </p>

        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-blue-500/30 transition"
            >

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-zinc-300 text-lg leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="mt-8">

                <h4 className="text-white text-xl font-bold">
                  {testimonial.name}
                </h4>

                <p className="text-zinc-500 mt-1">
                  {testimonial.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Testimonials