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
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-white text-2xl font-bold">
          Datos del cliente
        </h2>

        <p className="text-zinc-500 mt-2">
          Información para el pedido o factura.
        </p>

      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Nombre */}
        <div>

          <label className="text-zinc-400 text-sm">
            Nombre completo
          </label>

          <input
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className="
              mt-3 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Teléfono */}
        <div>

          <label className="text-zinc-400 text-sm">
            Teléfono
          </label>

          <input
            type="text"
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
            placeholder="11 2345 6789"
            className="
              mt-3 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Email */}
        <div>

          <label className="text-zinc-400 text-sm">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={clientData.email}
            onChange={handleChange}
            placeholder="cliente@email.com"
            className="
              mt-3 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* DNI/CUIT */}
        <div>

          <label className="text-zinc-400 text-sm">
            DNI / CUIT
          </label>

          <input
            type="text"
            name="dni"
            value={clientData.dni}
            onChange={handleChange}
            placeholder="20333444555"
            className="
              mt-3 w-full h-14 rounded-2xl
              bg-zinc-950 border border-white/10
              px-5
              text-white
              outline-none
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Dirección */}
        <div className="md:col-span-2">

          <label className="text-zinc-400 text-sm">
            Dirección
          </label>

          <input
            type="text"
            name="address"
            value={clientData.address}
            onChange={handleChange}
            placeholder="Av. Siempre Viva 742"
            className="
              mt-3 w-full h-14 rounded-2xl
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

    </div>
  )
}

export default ClientForm