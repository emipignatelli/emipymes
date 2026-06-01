import { useEffect, useMemo, useState } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'

import ClientForm from '../../components/orders/ClientForm'
import InvoicePreview from '../../components/orders/InvoicePreview'

import { useAuth } from '../../context/AuthContext'

import {
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi'

import toast from 'react-hot-toast'

function OrdersPage() {
  const { user } = useAuth()

  // Keys únicas por usuario
  

  const productsKey =
    `products_${user?.storageKey}`

  const salesKey =
    `sales_${user?.storageKey}`

  const clientsKey =
  `clients_${user?.storageKey}`  

  // Inventario
  const [inventoryProducts, setInventoryProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem(productsKey)

    return savedProducts
      ? JSON.parse(savedProducts)
      : []
  })

  const [clients, setClients] = useState(() => {
  const savedClients =
    localStorage.getItem(clientsKey)

  return savedClients
    ? JSON.parse(savedClients)
    : []
})

  // Pedido actual
  const [orderItems, setOrderItems] = useState([])

  // Medio de pago
  const [paymentMethod, setPaymentMethod] =
    useState('Efectivo')

  // Cliente
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    dni: '',
    address: '',
  })

  // Última venta
  const [latestSale, setLatestSale] = useState(null)
  // Buscadores
  const [searchName, setSearchName] = useState('')
  const [searchBarcode, setSearchBarcode] = useState('')
  const [clientSearch, setClientSearch] =
  useState('')

  const [showClients, setShowClients] =
  useState(false)

  // Agregar producto
  const handleAddProduct = (product) => {
    // Verificar stock
    if (product.stock <= 0) {
      toast.error('No hay stock disponible')

      return
    }

    // Verificar si ya existe
    const existingProduct = orderItems.find(
      (item) => item.name === product.name
    )

    // Si ya existe
    if (existingProduct) {
      const updatedOrder = orderItems.map((item) =>
        item.name === product.name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )

      setOrderItems(updatedOrder)
    }

    // Nuevo producto
    else {
      setOrderItems([
        ...orderItems,
        {
          ...product,
          quantity: 1,
        },
      ])
    }

    // Descontar stock
    const updatedInventory = inventoryProducts.map(
      (item) => {
        if (item.name === product.name) {
          return {
            ...item,
            stock: item.stock - 1,
            status:
              item.stock - 1 === 0
                ? 'Sin stock'
                : item.stock - 1 <= 5
                ? 'Stock bajo'
                : 'Disponible',
          }
        }

        return item
      }
    )

    setInventoryProducts(updatedInventory)

    localStorage.setItem(
      productsKey,
      JSON.stringify(updatedInventory)
    )

    toast.success('Producto agregado al pedido')
  }

  // Eliminar del pedido
  const handleRemoveProduct = (product) => {
    const existing = orderItems.find(
      (item) => item.name === product.name
    )

    if (!existing) return

    // Si cantidad > 1
    if (existing.quantity > 1) {
      const updatedOrder = orderItems.map((item) =>
        item.name === product.name
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )

      setOrderItems(updatedOrder)
    }

    // Si cantidad = 1
    else {
      const updatedOrder = orderItems.filter(
        (item) => item.name !== product.name
      )

      setOrderItems(updatedOrder)
    }

    // Devolver stock
    const updatedInventory = inventoryProducts.map(
      (item) => {
        if (item.name === product.name) {
          return {
            ...item,
            stock: item.stock + 1,
            status:
              item.stock + 1 === 0
                ? 'Sin stock'
                : item.stock + 1 <= 5
                ? 'Stock bajo'
                : 'Disponible',
          }
        }

        return item
      }
    )

    setInventoryProducts(updatedInventory)

    localStorage.setItem(
      productsKey,
      JSON.stringify(updatedInventory)
    )

    toast.success('Producto eliminado del pedido')
  }

  // Finalizar pedido
  const handleFinishOrder = () => {
    // Validaciones
    if (orderItems.length === 0) {
      toast.error('Agregá productos al pedido')

      return
    }

    if (!clientData.name) {
      toast.error('Ingresá el nombre del cliente')

      return
    }

    // Obtener ventas guardadas
    const savedSales =
      JSON.parse(localStorage.getItem(salesKey)) || []

    // Nueva venta
    const newSale = {
      id: Date.now(),

      client: clientData,

      products: orderItems,

      paymentMethod,

      total,

      date: new Date().toLocaleString(),

      status: 'Pendiente',
    }

    // Guardar
    const updatedSales = [...savedSales, newSale]

    localStorage.setItem(
      salesKey,
      JSON.stringify(updatedSales)
    )

    // Guardar última venta
    setLatestSale(newSale)

    // Limpiar pedido
    setOrderItems([])

    // Limpiar cliente
    setClientData({
      name: '',
      phone: '',
      email: '',
      dni: '',
      address: '',
    })

    // Reset payment
    setPaymentMethod('Efectivo')
    const clientExists =
    clients.some(
    (client) =>
      client.name === clientData.name
  )

    if (!clientExists) {
    const updatedClients = [
    ...clients,
    clientData,
  ]

  setClients(updatedClients)

  localStorage.setItem(
    clientsKey,
    JSON.stringify(updatedClients)
  )
}
    toast.success('Pedido finalizado correctamente')
  }

  const handleSaveClient = () => {
  if (!clientData.name.trim()) {
    toast.error('Ingresá el nombre del cliente')
    return
  }

  const exists = clients.some(
    (client) =>
      client.name.toLowerCase() ===
      clientData.name.toLowerCase()
  )

  if (exists) {
    toast.error('Ese cliente ya existe')
    return
  }

  const updatedClients = [
    ...clients,
    clientData,
  ]

  setClients(updatedClients)

  localStorage.setItem(
    clientsKey,
    JSON.stringify(updatedClients)
  )

  setClientSearch(clientData.name)

  setShowClients(false)

  setOpenClientModal(false)

  toast.success(
    'Cliente guardado correctamente'
  )
}

  // Total
  const total = useMemo(() => {
    return orderItems.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    )
  }, [orderItems])

  const filteredClients =
  clients.filter((client) =>
    client.name
      .toLowerCase()
      .includes(clientSearch.toLowerCase())
  )

  const filteredProducts = inventoryProducts.filter(
  (product) => {
    const matchName = product.name
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const matchBarcode =
      searchBarcode === ''
        ? true
        : (product.barcode || '')
            .toLowerCase()
            .includes(
              searchBarcode.toLowerCase()
            )

    return matchName && matchBarcode
  }
)
useEffect(() => {
  if (!searchBarcode.trim()) return

  const product = inventoryProducts.find(
    (item) =>
      item.barcode === searchBarcode
  )

  if (product) {
    handleAddProduct(product)
    setSearchBarcode('')
  }
}, [searchBarcode])

  const [openClientModal, setOpenClientModal] =
    useState(false)

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-white text-4xl font-black">
          Generación de pedidos
        </h1>

        <p className="text-zinc-500 mt-3">
          Creá presupuestos y controlá ventas.
        </p>

      </div>

      {/* Cliente */}
      <div className="mb-8">

        <div
  className="
    rounded-3xl
    border border-white/10
    bg-zinc-900
    p-6
  "
>
  <div className="flex gap-4">

    <div className="flex gap-3 items-start">

  <div className="flex-1 relative">

    <input
      type="text"
      placeholder="Buscar cliente..."
      value={clientSearch}
      onChange={(e) => {
        setClientSearch(
          e.target.value
        )

        setShowClients(true)
      }}
      className="
        w-full h-14
        rounded-2xl
        bg-zinc-950
        border border-white/10
        px-5
        text-white
      "
    />

    {showClients &&
      clientSearch && (
        <div
          className="
            absolute top-16 left-0
            w-full
            rounded-2xl
            bg-zinc-950
            border border-white/10
            overflow-hidden
            z-50
          "
        >
          {filteredClients.length >
          0 ? (
            filteredClients.map(
              (
                client,
                index
              ) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setClientData(
                      client
                    )

                    setClientSearch(
                      client.name
                    )

                    setShowClients(
                      false
                    )
                  }}
                  className="
                    w-full
                    px-5 py-4
                    text-left
                    text-white
                    hover:bg-white/5
                  "
                >
                  {client.name}
                </button>
              )
            )
          ) : (
            <div
              className="
                px-5 py-4
                text-zinc-500
              "
            >
              Cliente no encontrado
            </div>
          )}
        </div>
      )}

  </div>

  <button
    type="button"
    onClick={() =>
      setOpenClientModal(true)
    }
    className="
      w-14 h-14
      rounded-2xl
      bg-blue-600
      hover:bg-blue-700
      transition
      text-white
      text-3xl
      font-bold
      flex items-center
      justify-center
      shrink-0
    "
  >
    +
  </button>

</div>

  </div>
</div>

      </div>

      <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8">

        {/* Productos */}
        <div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

            <div className="flex items-center gap-3 mb-8">

              <HiOutlineShoppingCart className="text-3xl text-blue-400" />

              <h2 className="text-white text-2xl font-bold">
                Inventario disponible
              </h2>

            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">

  {/* Buscar por nombre */}
  <input
    type="text"
    placeholder="Buscar producto..."
    value={searchName}
    onChange={(e) =>
      setSearchName(e.target.value)
    }
    className="
      h-12
      rounded-2xl
      bg-zinc-950
      border border-white/10
      px-4
      text-white
      outline-none
      focus:border-blue-500
    "
  />

  {/* Código de barras */}
  <input
    type="text"
    placeholder="Escanear código de barras..."
    value={searchBarcode}
    onChange={(e) =>
      setSearchBarcode(e.target.value)
    }
    className="
      h-12
      rounded-2xl
      bg-zinc-950
      border border-white/10
      px-4
      text-white
      outline-none
      focus:border-blue-500
    "
  />

</div>

            <div className="space-y-4">

              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    bg-zinc-950
                    border border-white/5
                    p-5
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                  "
                >

                  <div>

                    <h3 className="text-white text-xl font-bold">
                      {product.name}
                    </h3>

                    <p className="text-zinc-400 mt-1">
                      {product.category}
                    </p>

                    <div className="flex gap-6 mt-4">

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Precio
                        </p>

                        <h4 className="text-white font-bold">
                          $
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </h4>

                      </div>

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Stock
                        </p>

                        <h4 className="text-white font-bold">
                          {product.stock}
                        </h4>

                      </div>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleAddProduct(product)
                    }
                    className="
                      h-12 px-6 rounded-2xl
                      bg-blue-600 hover:bg-blue-700
                      transition
                      text-white font-bold
                    "
                  >
                    Agregar
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Pedido */}
        <div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 sticky top-6">

            <h2 className="text-white text-2xl font-bold mb-8">
              Pedido actual
            </h2>

            {/* Productos */}
            <div className="space-y-4">

              {orderItems.length === 0 ? (
                <div className="rounded-2xl bg-zinc-950 p-8 text-center">

                  <p className="text-zinc-500">
                    No hay productos agregados.
                  </p>

                </div>
              ) : (
                orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-zinc-950
                      p-5
                      border border-white/5
                    "
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-white font-bold">
                          {item.name}
                        </h3>

                        <p className="text-zinc-400 mt-1">
                          Cantidad: {item.quantity}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          handleRemoveProduct(item)
                        }
                        className="
                          w-10 h-10 rounded-xl
                          bg-red-500/10 hover:bg-red-500/20
                          transition
                          flex items-center justify-center
                          text-red-400 text-xl
                        "
                      >

                        <HiOutlineTrash />

                      </button>

                    </div>

                    <div className="mt-5">

                      <p className="text-zinc-500 text-sm">
                        Subtotal
                      </p>

                      <h4 className="text-white text-xl font-bold mt-1">
                        $
                        {Number(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </h4>

                    </div>

                  </div>
                ))
              )}

            </div>

            {/* Total */}
            <div className="mt-8 rounded-2xl bg-zinc-950 p-6">

              <div className="flex items-center justify-between">

                <p className="text-zinc-400 text-lg">
                  Total
                </p>

                <h3 className="text-white text-3xl font-black">
                  ${Number(total).toLocaleString()}
                </h3>

              </div>

            </div>

            {/* Payment */}
            <div className="mt-6">

              <label className="text-zinc-400 text-sm">
                Medio de pago
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="
                  mt-3 w-full h-14 rounded-2xl
                  bg-zinc-950 border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              >

                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>Mercado Pago</option>

              </select>

            </div>

            {/* Button */}
            <button
              onClick={handleFinishOrder}
              className="
                mt-8 w-full h-14 rounded-2xl
                bg-green-600 hover:bg-green-700
                transition
                text-white font-bold text-lg
              "
            >
              Finalizar pedido
            </button>

          </div>

        </div>

      </div>

      {/* Factura */}
      <InvoicePreview
        latestSale={latestSale}
      />


    {
  openClientModal && (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70
        backdrop-blur-sm
        flex items-center justify-center
        p-6
      "
    >
      <div className="w-full max-w-3xl">

        <ClientForm
          clientData={clientData}
          setClientData={setClientData}
        />

        <div className="mt-4 flex justify-end">

          <button
          onClick={handleSaveClient}
          className="
          px-6 h-12
          rounded-xl
         bg-green-600
         hover:bg-green-700
         text-white
         font-semibold
                      "
          >
          Guardar cliente
          </button>

        </div>

      </div>
    </div>
  )
}
    </DashboardLayout>
  )
}

export default OrdersPage