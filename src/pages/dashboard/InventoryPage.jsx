import { useEffect, useState } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'
import ProductForm from '../../components/inventory/ProductForm'

import { useAuth } from '../../context/AuthContext'

import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineCube,
  HiOutlineExclamationCircle,
  HiOutlineTag,
} from 'react-icons/hi'

import toast from 'react-hot-toast'

function InventoryPage() {
  const { user } = useAuth()

  // Key usuario
  const productsKey =
    `products_${user?.storageKey}`

  const [openModal, setOpenModal] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [editingIndex, setEditingIndex] =
    useState(null)

  const [editingProduct, setEditingProduct] =
    useState(null)

  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem(productsKey)

    return savedProducts
      ? JSON.parse(savedProducts)
      : []
  })

  // Guardar productos
  useEffect(() => {
    localStorage.setItem(
      productsKey,
      JSON.stringify(products)
    )
  }, [products, productsKey])

  // Agregar
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      newProduct,
    ])

    toast.success(
      'Producto agregado correctamente'
    )
  }

  // Eliminar
  const handleDeleteProduct = (
    indexToDelete
  ) => {
    const updatedProducts =
      products.filter(
        (_, index) =>
          index !== indexToDelete
      )

    setProducts(updatedProducts)

    toast.success('Producto eliminado')
  }

  // Editar modal
  const handleOpenEdit = (
    product,
    index
  ) => {
    setEditingProduct(product)

    setEditingIndex(index)

    setOpenModal(true)
  }

  // Editar producto
  const handleEditProduct = (
    updatedProduct
  ) => {
    const updatedProducts = [...products]

    updatedProducts[editingIndex] =
      updatedProduct

    setProducts(updatedProducts)

    toast.success(
      'Producto actualizado'
    )

    setEditingProduct(null)

    setEditingIndex(null)
  }

  // Buscar
  const filteredProducts = products.filter(
  (product) => {
    const searchTerm =
      search.toLowerCase()

    return (
      product.name
        ?.toLowerCase()
        .includes(searchTerm) ||

      product.barcode
        ?.toLowerCase()
        .includes(searchTerm)
    )
  }
)

  return (
    <DashboardLayout>

      {/* Header */}
      <div
        className="
          flex flex-col xl:flex-row
          xl:items-center xl:justify-between
          gap-6 mb-10
        "
      >

        <div>

          <h1 className="text-white text-4xl font-black tracking-tight">
            Inventario
          </h1>

          <p className="text-zinc-500 mt-2">
            Gestioná productos, stock y categorías.
          </p>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Search */}
          <div className="relative">

            <span
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-zinc-500 text-lg
              "
            >

              <HiOutlineSearch />

            </span>

            <input
              type="text"
              placeholder="Buscar producto o código..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full sm:w-[300px]
                h-12
                rounded-xl
                bg-zinc-900
                border border-white/10
                pl-11 pr-4
                text-sm text-white
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

          {/* Button */}
          <button
            onClick={() => {
              setEditingProduct(null)
              setOpenModal(true)
            }}
            className="
              h-12 px-5 rounded-xl
              bg-blue-600 hover:bg-blue-700
              transition
              text-white font-semibold text-sm
              flex items-center justify-center gap-2
              shadow-lg shadow-blue-500/20
            "
          >

            <HiOutlinePlus className="text-xl" />

            Nuevo producto

          </button>

        </div>

      </div>

      {/* Stats */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 mb-10">

        {/* Productos */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Productos
              </p>

              <h2 className="text-white text-4xl font-black mt-3">
                {products.length}
              </h2>

            </div>

            <div
              className="
                w-14 h-14 rounded-2xl
                bg-blue-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineCube className="text-3xl text-blue-400" />

            </div>

          </div>

        </div>

        {/* Stock bajo */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Stock bajo
              </p>

              <h2 className="text-yellow-400 text-4xl font-black mt-3">
                {
                  products.filter(
                    (product) =>
                      product.status ===
                      'Stock bajo'
                  ).length
                }
              </h2>

            </div>

            <div
              className="
                w-14 h-14 rounded-2xl
                bg-yellow-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineExclamationCircle className="text-3xl text-yellow-400" />

            </div>

          </div>

        </div>

        {/* Sin stock */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Sin stock
              </p>

              <h2 className="text-red-400 text-4xl font-black mt-3">
                {
                  products.filter(
                    (product) =>
                      product.status ===
                      'Sin stock'
                  ).length
                }
              </h2>

            </div>

            <div
              className="
                w-14 h-14 rounded-2xl
                bg-red-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineExclamationCircle className="text-3xl text-red-400" />

            </div>

          </div>

        </div>

        {/* Categorías */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-6
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Categorías
              </p>

              <h2 className="text-purple-400 text-4xl font-black mt-3">
                {
                  new Set(
                    products.map(
                      (product) =>
                        product.category
                    )
                  ).size
                }
              </h2>

            </div>

            <div
              className="
                w-14 h-14 rounded-2xl
                bg-purple-500/10
                flex items-center justify-center
              "
            >

              <HiOutlineTag className="text-3xl text-purple-400" />

            </div>

          </div>

        </div>

      </div>

      {/* Desktop */}
      <div
        className="
          hidden lg:block
          rounded-3xl
          border border-white/10
          bg-zinc-900
          overflow-hidden
        "
      >

        {/* Header */}
        <div
          className="
            grid grid-cols-6
            px-6 py-4
            border-b border-white/10
            text-zinc-500 text-sm font-semibold
            bg-white/[0.02]
          "
        >

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
        <div className="divide-y divide-white/5">

          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center">

              <h3 className="text-white text-2xl font-bold">
                No hay productos
              </h3>

              <p className="text-zinc-500 mt-2">
                Agregá productos para comenzar.
              </p>

            </div>
          ) : (
            filteredProducts.map(
              (product, index) => (
                <div
                  key={index}
                  className="
                    grid grid-cols-6
                    px-6 py-5
                    items-center
                    text-white
                    hover:bg-white/[0.03]
                    transition
                  "
                >

                  <div>

                    <h3 className="font-semibold">
                       {product.name}
                    </h3>

                    <p className="text-zinc-600 text-xs mt-1">
                    Código: {product.barcode || '-'}
                    </p>

                    <p className="text-zinc-500 text-sm mt-1">
                      {product.description?.slice(
                        0,
                        35
                      ) || 'Sin descripción'}
                    </p>

                  </div>

                  <p className="text-zinc-600 text-xs mt-1">
  Código: {product.barcode || '-'}
</p>

                  <p className="font-semibold">
                    $
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </p>

                  <p>{product.stock}</p>

                  <div>

                    <span
                      className={`
                        px-3 py-1.5 rounded-full
                        text-xs font-bold
                        ${
                          product.status ===
                          'Disponible'
                            ? 'bg-green-500/10 text-green-400'
                            : product.status ===
                              'Stock bajo'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }
                      `}
                    >

                      {product.status}

                    </span>

                  </div>

                  {/* Actions */}
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        handleOpenEdit(
                          product,
                          index
                        )
                      }
                      className="
                        w-10 h-10 rounded-xl
                        bg-blue-500/10
                        hover:bg-blue-500/20
                        transition
                        flex items-center justify-center
                        text-blue-400
                      "
                    >

                      <HiOutlinePencil />

                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProduct(
                          index
                        )
                      }
                      className="
                        w-10 h-10 rounded-xl
                        bg-red-500/10
                        hover:bg-red-500/20
                        transition
                        flex items-center justify-center
                        text-red-400
                      "
                    >

                      <HiOutlineTrash />

                    </button>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>

      {/* Mobile */}
      <div className="lg:hidden space-y-5">

        {filteredProducts.map(
          (product, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border border-white/10
                bg-zinc-900
                p-5
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="text-white text-lg font-bold">
                    {product.name}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">
                    {product.category}
                  </p>

                </div>

                <span
                  className={`
                    px-3 py-1.5 rounded-full
                    text-xs font-bold whitespace-nowrap
                    ${
                      product.status ===
                      'Disponible'
                        ? 'bg-green-500/10 text-green-400'
                        : product.status ===
                          'Stock bajo'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-red-500/10 text-red-400'
                    }
                  `}
                >

                  {product.status}

                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">

                <div className="rounded-2xl bg-zinc-950 p-4">

                  <p className="text-zinc-500 text-xs">
                    Precio
                  </p>

                  <h4 className="text-white text-lg font-bold mt-2">
                    $
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </h4>

                </div>

                <div className="rounded-2xl bg-zinc-950 p-4">

                  <p className="text-zinc-500 text-xs">
                    Stock
                  </p>

                  <h4 className="text-white text-lg font-bold mt-2">
                    {product.stock}
                  </h4>

                </div>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    handleOpenEdit(
                      product,
                      index
                    )
                  }
                  className="
                    flex-1 h-11 rounded-xl
                    bg-blue-500/10
                    hover:bg-blue-500/20
                    transition
                    text-blue-400
                    text-sm font-semibold
                    flex items-center justify-center gap-2
                  "
                >

                  <HiOutlinePencil />

                  Editar

                </button>

                <button
                  onClick={() =>
                    handleDeleteProduct(index)
                  }
                  className="
                    flex-1 h-11 rounded-xl
                    bg-red-500/10
                    hover:bg-red-500/20
                    transition
                    text-red-400
                    text-sm font-semibold
                    flex items-center justify-center gap-2
                  "
                >

                  <HiOutlineTrash />

                  Eliminar

                </button>

              </div>

            </div>
          )
        )}

      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/70 backdrop-blur-sm
            flex items-center justify-center
            px-6 py-10
            animate-in fade-in duration-200
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
              w-11 h-11 rounded-full
              bg-white/10
              hover:bg-white/20
              transition
              text-white text-xl
              flex items-center justify-center
            "
          >

            <HiOutlineX />

          </button>

          <ProductForm
            onAddProduct={
              handleAddProduct
            }
            onEditProduct={
              handleEditProduct
            }
            editingProduct={
              editingProduct
            }
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