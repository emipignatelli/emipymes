function ClientForm({
  clientData,
  setClientData,
}) {
  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="
        rounded-[28px]
        border border-white/10
        bg-zinc-900
        p-5 md:p-6
      "
    >

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-white text-xl md:text-2xl font-black">
              Datos del cliente
            </h2>

            <p className="text-zinc-500 mt-1 text-sm">
              Información utilizada para el pedido y facturación.
            </p>

          </div>

          

        </div>

      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* Nombre */}
        <div>

          <label className="text-zinc-400 text-sm font-medium">
            Nombre completo
          </label>

          <input
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className="
              mt-2 w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:bg-zinc-950
            "
          />

        </div>

        {/* Teléfono */}
        <div>

          <label className="text-zinc-400 text-sm font-medium">
            Teléfono
          </label>

          <input
            type="text"
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
            placeholder="11 2345 6789"
            className="
              mt-2 w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* Email */}
        <div>

          <label className="text-zinc-400 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={clientData.email}
            onChange={handleChange}
            placeholder="cliente@email.com"
            className="
              mt-2 w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* DNI */}
        <div>

          <label className="text-zinc-400 text-sm font-medium">
            DNI / CUIT
          </label>

          <input
            type="text"
            name="dni"
            value={clientData.dni}
            onChange={handleChange}
            placeholder="20-33344455-1"
            className="
              mt-2 w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* Dirección */}
        <div className="md:col-span-2">

          <label className="text-zinc-400 text-sm font-medium">
            Dirección
          </label>

          <input
            type="text"
            name="address"
            value={clientData.address}
            onChange={handleChange}
            placeholder="Av. Siempre Viva 742"
            className="
              mt-2 w-full h-12
              rounded-xl
              bg-zinc-950
              border border-white/10
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

      </div>

    </div>
  )
}

export default ClientForm