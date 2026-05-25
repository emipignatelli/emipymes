import { useEffect, useState } from 'react'

import DashboardLayout from '../../components/layout/DashboardLayout'

import {
  HiOutlineCamera,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineIdentification,
} from 'react-icons/hi'

import toast from 'react-hot-toast'

function UserPanel() {
  // Datos usuario
  const [userData, setUserData] = useState(() => {
    const savedUser =
      localStorage.getItem('userData')

    return savedUser
      ? JSON.parse(savedUser)
      : {
          businessName: '',
          email: '',
          phone: '',
          address: '',
          cuit: '',
          avatar: '',
        }
  })

  // Guardar automáticamente
  useEffect(() => {
    localStorage.setItem(
      'userData',
      JSON.stringify(userData)
    )
  }, [userData])

  // Inputs
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  // Imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setUserData({
        ...userData,
        avatar: reader.result,
      })

      toast.success(
        'Imagen actualizada'
      )
    }

    reader.readAsDataURL(file)
  }

  // Guardar
  const handleSave = () => {
    localStorage.setItem(
      'userData',
      JSON.stringify(userData)
    )

    toast.success(
      'Datos guardados correctamente'
    )
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-white text-4xl font-black">
          Usuario
        </h1>

        <p className="text-zinc-500 mt-3">
          Configuración del negocio y perfil.
        </p>

      </div>

      <div className="grid xl:grid-cols-[0.45fr_1fr] gap-8">

        {/* Left */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-8
            h-fit
          "
        >

          {/* Avatar */}
          <div className="flex flex-col items-center text-center">

            <div
              className="
                w-40 h-40 rounded-full
                overflow-hidden
                border-4 border-blue-500
                bg-zinc-950
              "
            >

              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="
                    w-full h-full
                    flex items-center justify-center
                    text-zinc-600
                    text-6xl
                  "
                >
                  <HiOutlineOfficeBuilding />
                </div>
              )}

            </div>

            {/* Upload */}
            <label
              className="
                mt-6 h-12 px-5 rounded-2xl
                bg-blue-600 hover:bg-blue-700
                transition
                text-white font-bold
                flex items-center gap-2
                cursor-pointer
              "
            >

              <HiOutlineCamera className="text-xl" />

              Cambiar imagen

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </label>

            <h2 className="text-white text-2xl font-bold mt-8">

              {userData.businessName ||
                'Mi Negocio'}

            </h2>

            <p className="text-zinc-500 mt-2">

              Perfil del negocio

            </p>

          </div>

        </div>

        {/* Right */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-zinc-900
            p-8
          "
        >

          <div className="grid md:grid-cols-2 gap-6">

            {/* Nombre */}
            <div>

              <label className="text-zinc-400 text-sm flex items-center gap-2">

                <HiOutlineOfficeBuilding />

                Nombre del negocio

              </label>

              <input
                type="text"
                name="businessName"
                value={userData.businessName}
                onChange={handleChange}
                placeholder="Mi Empresa"
                className="
                  mt-3 w-full h-14 rounded-2xl
                  bg-zinc-950 border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

            {/* Email */}
            <div>

              <label className="text-zinc-400 text-sm flex items-center gap-2">

                <HiOutlineMail />

                Correo electrónico

              </label>

              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="empresa@email.com"
                className="
                  mt-3 w-full h-14 rounded-2xl
                  bg-zinc-950 border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

            {/* Teléfono */}
            <div>

              <label className="text-zinc-400 text-sm flex items-center gap-2">

                <HiOutlinePhone />

                Teléfono

              </label>

              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="+54 9 11 0000-0000"
                className="
                  mt-3 w-full h-14 rounded-2xl
                  bg-zinc-950 border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

            {/* Dirección */}
            <div>

              <label className="text-zinc-400 text-sm flex items-center gap-2">

                <HiOutlineLocationMarker />

                Dirección

              </label>

              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Av. Siempre Viva 742"
                className="
                  mt-3 w-full h-14 rounded-2xl
                  bg-zinc-950 border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

          </div>

          {/* CUIT */}
          <div className="mt-6">

            <label className="text-zinc-400 text-sm flex items-center gap-2">

              <HiOutlineIdentification />

              CUIT / DNI

            </label>

            <input
              type="text"
              name="cuit"
              value={userData.cuit}
              onChange={handleChange}
              placeholder="20-12345678-9"
              className="
                mt-3 w-full h-14 rounded-2xl
                bg-zinc-950 border border-white/10
                px-5
                text-white
                outline-none
                focus:border-blue-500
              "
            />

          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="
              mt-10 w-full h-14 rounded-2xl
              bg-green-600 hover:bg-green-700
              transition
              text-white font-bold text-lg
            "
          >
            Guardar cambios
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default UserPanel