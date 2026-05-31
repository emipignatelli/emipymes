import { useEffect, useState } from 'react'

function ProductForm({
  onAddProduct,
  onEditProduct,
  editingProduct,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })

  // Cargar datos edición
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct)
    }
  }, [editingProduct])

  // Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedProduct = {
      ...formData,

      status:
        Number(formData.stock) === 0
          ? 'Sin stock'
          : Number(formData.stock) <= 5
          ? 'Stock bajo'
          : 'Disponible',
    }

    if (editingProduct) {
      onEditProduct(updatedProduct)
    } else {
      onAddProduct(updatedProduct)
    }

    onClose()
  }

  return (
    <div
      className="
        w-full max-w-xl
        rounded-[28px]
        border border-white/10
        bg-zinc-900
        shadow-2xl
        overflow-hidden
      "
    >

      {/* Top */}
      <div
        className="
          px-8 py-7
          border-b border-white/10
          bg-gradient-to-b
          from-white/[0.03]
          to-transparent
        "
      >

        <h2 className="text-white text-3xl font-black">

          {editingProduct
            ? 'Editar producto'
            : 'Nuevo producto'}

        </h2>

        <p className="text-zinc-500 mt-2 text-sm">

          {editingProduct
            ? 'Actualizá la información del producto.'
            : 'Completá los datos para agregar un producto.'}

        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-7"
      >

        {/* Nombre */}
        <div>

          <label className="text-sm text-zinc-400 font-medium">
            Nombre del producto
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Teclado Redragon"
            className="
              mt-2
              w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-white
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

        {/* Código de barras + SKU */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="text-sm text-zinc-400 font-medium">
              Código de barras
            </label>

            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              placeholder="7791234567890"
              className="
                mt-2
                w-full h-12
                rounded-xl
                bg-zinc-950
                border border-white/10
                px-4
                text-white
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

          <div>

            <label className="text-sm text-zinc-400 font-medium">
              SKU
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="PROD-001"
              className="
                mt-2
                w-full h-12
                rounded-xl
                bg-zinc-950
                border border-white/10
                px-4
                text-white
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

        </div>

        {/* Categoría + Precio */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="text-sm text-zinc-400 font-medium">
              Categoría
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Periféricos"
              className="
                mt-2
                w-full h-12
                rounded-xl
                bg-zinc-950
                border border-white/10
                px-4
                text-white
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

          <div>

            <label className="text-sm text-zinc-400 font-medium">
              Precio
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$0"
              className="
                mt-2
                w-full h-12
                rounded-xl
                bg-zinc-950
                border border-white/10
                px-4
                text-white
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

        </div>

        {/* Stock */}
        <div>

          <label className="text-sm text-zinc-400 font-medium">
            Stock disponible
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="
              mt-2
              w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-white
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

        {/* Descripción */}
        <div>

          <label className="text-sm text-zinc-400 font-medium">
            Descripción
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto..."
            className="
              mt-2
              w-full
              rounded-xl
              bg-zinc-950
              border border-white/10
              p-4
              text-white
              text-sm
              outline-none
              transition
              resize-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

        {/* Bottom */}
        <div
          className="
            flex flex-col-reverse sm:flex-row
            gap-3
            pt-3
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 h-12
              rounded-xl
              border border-white/10
              bg-white/[0.02]
              hover:bg-white/[0.05]
              transition
              text-white
              text-sm
              font-semibold
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="
              flex-1 h-12
              rounded-xl
              bg-blue-600 hover:bg-blue-700
              transition
              text-white
              text-sm
              font-semibold
              shadow-lg shadow-blue-500/20
            "
          >

            {editingProduct
              ? 'Guardar cambios'
              : 'Guardar producto'}

          </button>

        </div>

      </form>

    </div>
  )
}

export default ProductForm