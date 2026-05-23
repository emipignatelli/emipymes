import { useEffect, useState } from 'react'

function ProductForm({
  onAddProduct,
  onEditProduct,
  editingProduct,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct)
    }
  }, [editingProduct])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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

    // EDITAR
    if (editingProduct) {
      onEditProduct(updatedProduct)
    }

    // AGREGAR
    else {
      onAddProduct(updatedProduct)
    }

    onClose()
  }

  return (
    <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">

      {/* Header */}
      <div className="mb-10">

        <h2 className="text-white text-4xl font-black">

          {editingProduct
            ? 'Editar producto'
            : 'Agregar producto'}

        </h2>

        <p className="text-zinc-500 mt-3">

          {editingProduct
            ? 'Modificá la información del producto.'
            : 'Completá la información del producto.'}

        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Nombre */}
        <div>

          <label className="text-zinc-300 text-sm">
            Nombre del producto
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Teclado Redragon"
            className="
              mt-2 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Categoría y Precio */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-zinc-300 text-sm">
              Categoría
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Periféricos"
              className="
                mt-2 w-full h-14 rounded-2xl
                bg-zinc-950 border border-white/10
                px-5
                text-white
                outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          <div>

            <label className="text-zinc-300 text-sm">
              Precio
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$0"
              className="
                mt-2 w-full h-14 rounded-2xl
                bg-zinc-950 border border-white/10
                px-5
                text-white
                outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

        </div>

        {/* Stock */}
        <div>

          <label className="text-zinc-300 text-sm">
            Stock disponible
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="
              mt-2 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Descripción */}
        <div>

          <label className="text-zinc-300 text-sm">
            Descripción
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del producto..."
            className="
              mt-2 w-full rounded-2xl
              bg-zinc-950 border border-white/10
              p-5
              text-white
              outline-none
              focus:border-blue-500
              transition
              resize-none
            "
          />

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

          <button
            type="submit"
            className="
              flex-1 h-14 rounded-2xl
              bg-blue-600 hover:bg-blue-700
              transition
              text-white font-bold text-lg
            "
          >

            {editingProduct
              ? 'Guardar cambios'
              : 'Guardar producto'}

          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 h-14 rounded-2xl
              border border-white/10
              hover:bg-white/5
              transition
              text-white font-bold text-lg
            "
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>
  )
}

export default ProductForm