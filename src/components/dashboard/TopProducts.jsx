function TopProducts({
  sales,
}) {
  // Contador productos
  const productsMap = {}

  sales.forEach((sale) => {
    sale.products.forEach((product) => {
      if (!productsMap[product.name]) {
        productsMap[product.name] = 0
      }

      productsMap[product.name] +=
        product.quantity
    })
  })

  // Ordenar
  const topProducts = Object.entries(
    productsMap
  )
    .map(([name, quantity]) => ({
      name,
      quantity,
    }))
    .sort(
      (a, b) =>
        b.quantity - a.quantity
    )
    .slice(0, 5)

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-zinc-900
        p-6
      "
    >

      <div className="mb-8">

        <h2 className="text-white text-2xl font-bold">
          Productos más vendidos
        </h2>

        <p className="text-zinc-500 mt-2">
          Ranking de productos.
        </p>

      </div>

      <div className="space-y-4">

        {topProducts.length === 0 ? (
          <div className="rounded-2xl bg-zinc-950 p-6">

            <p className="text-zinc-500">
              No hay ventas todavía.
            </p>

          </div>
        ) : (
          topProducts.map(
            (product, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  bg-zinc-950
                  border border-white/5
                  p-5
                  flex items-center justify-between
                "
              >

                <div>

                  <h3 className="text-white font-bold">
                    {product.name}
                  </h3>

                  <p className="text-zinc-500 mt-1">
                    Unidades vendidas
                  </p>

                </div>

                <div
                  className="
                    px-4 py-2 rounded-xl
                    bg-blue-500/10
                    text-blue-400
                    font-bold
                  "
                >

                  {product.quantity}

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  )
}

export default TopProducts