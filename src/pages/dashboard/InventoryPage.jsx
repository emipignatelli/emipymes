import { useEffect, useState } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'
import ProductForm from '../../components/inventory/ProductForm'

import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineTrash,
  HiOutlinePencil,
} from 'react-icons/hi'

import toast from 'react-hot-toast'

function InventoryPage() {
  const [openModal, setOpenModal] = useState(false)

  const [search, setSearch] = useState('')

  const [editingIndex, setEditingIndex] = useState(null)

  const [editingProduct, setEditingProduct] = useState(null)

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products')

    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            name: 'Teclado Redragon',
            category: 'Periféricos',
            price: 120000,
            stock: 18,
            status: 'Disponible',
          },

          {
            name: 'Mouse Logitech',
            category: 'Periféricos',
            price: 85000,
            stock: 4,
            status: 'Stock bajo',
          },

          {
            name: 'Auriculares HyperX',
            category: 'Audio',
            price: 210000,
            stock: 0,
            status: 'Sin stock',
          },
        ]
  })

  // Guardar productos
  useEffect(() => {
    localStorage.setItem(
      'products',
      JSON.stringify(products)
    )
  }, [products])

  // Agregar producto
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct])

    toast.success('Producto agregado correctamente')
  }

  // Eliminar producto
  const handleDeleteProduct = (indexToDelete) => {
    const updatedProducts = products.filter(
      (_, index) => index !== indexToDelete
    )

    setProducts(updatedProducts)

    toast.success('Producto eliminado')
  }

  // Abrir edición
  const handleOpenEdit = (product, index) => {
    setEditingProduct(product)

    setEditingIndex(index)

    setOpenModal(true)
  }

  // Editar producto
  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = [...products]

    updatedProducts[editingIndex] = updatedProduct

    setProducts(updatedProducts)

    toast.success('Producto actualizado')

    setEditingProduct(null)

    setEditingIndex(null)
  }

  // Filtrar productos
  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>

      {/* Top */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-white text-4xl font-black">
            Inventario
          </h1>

          <p className="text-zinc-500 mt-2">
            Gestioná productos y controlá el stock.
          </p>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Search */}
          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xl">
              <HiOutlineSearch />
            </span>

            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full sm:w-[320px]
                h-14 rounded-2xl
                bg-zinc-900 border border-white/10
                pl-12 pr-4
                text-white
                outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              setEditingProduct(null)
              setOpenModal(true)
            }}
            className="
              h-14 px-6 rounded-2xl
              bg-blue-600 hover:bg-blue-700
              transition
              text-white font-bold
              flex items-center justify-center gap-3
            "
          >

            <HiOutlinePlus className="text-2xl" />

            Agregar producto

          </button>
          

        </div>

      </div>

      {/* Stats */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Productos totales
          </p>

          <h2 className="text-white text-4xl font-black mt-4">
            {products.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Stock bajo
          </p>

          <h2 className="text-yellow-400 text-4xl font-black mt-4">
            {
              products.filter(
                (product) => product.status === 'Stock bajo'
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Sin stock
          </p>

          <h2 className="text-red-400 text-4xl font-black mt-4">
            {
              products.filter(
                (product) => product.status === 'Sin stock'
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-6">
          <p className="text-zinc-400">
            Categorías
          </p>

          <h2 className="text-blue-400 text-4xl font-black mt-4">
            {
              new Set(products.map((product) => product.category))
                .size
            }
          </h2>
        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block rounded-3xl border border-white/10 bg-zinc-900 overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-6 px-6 py-5 border-b border-white/10 text-zinc-400 font-semibold">

          <p>Producto</p>
          <p>Categoría</p>
          <p>Precio</p>
          <p>Stock</p>
          <p>Estado</p>

          <p className="text-center">
            Acciones
          </p>

        </div>

        {/* Rows */}
        <div className="divide-y divide-white/10">

          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-6 px-6 py-5 items-center text-white hover:bg-white/5 transition"
            >

              <p className="font-semibold">
                {product.name}
              </p>

              <p className="text-zinc-400">
                {product.category}
              </p>

              <p>
                ${Number(product.price).toLocaleString()}
              </p>

              <p>
                {product.stock}
              </p>

              <div>

                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      product.status === 'Disponible'
                        ? 'bg-green-500/20 text-green-400'
                        : product.status === 'Stock bajo'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }
                  `}
                >
                  {product.status}
                </span>

              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">

                {/* Edit */}
                <button
                  onClick={() =>
                    handleOpenEdit(product, index)
                  }
                  className="
                    w-11 h-11 rounded-xl
                    bg-blue-500/10 hover:bg-blue-500/20
                    transition
                    flex items-center justify-center
                    text-blue-400 text-xl
                  "
                >

                  <HiOutlinePencil />

                </button>

                {/* Delete */}
                <button
                  onClick={() =>
                    handleDeleteProduct(index)
                  }
                  className="
                    w-11 h-11 rounded-xl
                    bg-red-500/10 hover:bg-red-500/20
                    transition
                    flex items-center justify-center
                    text-red-400 text-xl
                  "
                >

                  <HiOutlineTrash />

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-5">

        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="
              rounded-3xl
              border border-white/10
              bg-zinc-900
              p-6
            "
          >

            {/* Top */}
            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-white text-xl font-bold">
                  {product.name}
                </h3>

                <p className="text-zinc-400 mt-1">
                  {product.category}
                </p>

              </div>

              <span
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                  ${
                    product.status === 'Disponible'
                      ? 'bg-green-500/20 text-green-400'
                      : product.status === 'Stock bajo'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }
                `}
              >
                {product.status}
              </span>

            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl bg-zinc-950 p-4">

                <p className="text-zinc-500 text-sm">
                  Precio
                </p>

                <h4 className="text-white text-lg font-bold mt-2">
                  ${Number(product.price).toLocaleString()}
                </h4>

              </div>

              <div className="rounded-2xl bg-zinc-950 p-4">

                <p className="text-zinc-500 text-sm">
                  Stock
                </p>

                <h4 className="text-white text-lg font-bold mt-2">
                  {product.stock}
                </h4>

              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">

              {/* Edit */}
              <button
                onClick={() =>
                  handleOpenEdit(product, index)
                }
                className="
                  flex-1 h-12 rounded-2xl
                  bg-blue-500/10 hover:bg-blue-500/20
                  transition
                  text-blue-400 font-bold
                  flex items-center justify-center gap-2
                "
              >

                <HiOutlinePencil />

                Editar

              </button>

              {/* Delete */}
              <button
                onClick={() =>
                  handleDeleteProduct(index)
                }
                className="
                  flex-1 h-12 rounded-2xl
                  bg-red-500/10 hover:bg-red-500/20
                  transition
                  text-red-400 font-bold
                  flex items-center justify-center gap-2
                "
              >

                <HiOutlineTrash />

                Eliminar

              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/70 backdrop-blur-sm
            flex items-center justify-center
            px-6 py-10
          "
        >

          {/* Close */}
          <button
            onClick={() => {
              setOpenModal(false)
              setEditingProduct(null)
            }}
            className="
              absolute top-6 right-6
              w-12 h-12 rounded-full
              bg-white/10 hover:bg-white/20
              transition
              text-white text-2xl
              flex items-center justify-center
            "
          >

            <HiOutlineX />

          </button>

          {/* Form */}
          <ProductForm
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            editingProduct={editingProduct}
            onClose={() => {
              setOpenModal(false)
              setEditingProduct(null)
            }}
          />

        </div>
      )}

    </DashboardLayout>
  )
}

export default InventoryPage