import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'

import { FcGoogle } from 'react-icons/fc'

import toast from 'react-hot-toast'

import { useAuth } from '../../context/AuthContext'

function RegisterForm() {
  const navigate = useNavigate()

  const { register } = useAuth()

  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    })

  // Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    })
  }

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error(
        'Completá todos los campos'
      )

      return
    }

    // Contraseñas
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        'Las contraseñas no coinciden'
      )

      return
    }

    // Términos
    if (!formData.terms) {
      toast.error(
        'Aceptá los términos'
      )

      return
    }

    // Nuevo usuario
    const newUser = {
      firstName:
        formData.firstName,
      lastName:
        formData.lastName,
      email: formData.email,
      password:
        formData.password,
    }

    // Register
    const result =
      register(newUser)

    // Error
    if (!result.success) {
      toast.error(result.message)

      return
    }

    // Success
    toast.success(
      'Cuenta creada correctamente'
    )

    navigate('/login')
  }

  return (
    <div
      className="
        w-full max-w-2xl
        rounded-[32px]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8 md:p-12
        shadow-2xl
      "
    >

      {/* Header */}
      <div className="text-center mb-10">

        <h2
          className="
            text-white
            text-4xl md:text-5xl
            font-black
          "
        >
          Crear cuenta
        </h2>

        <p className="text-zinc-400 mt-4">
          Empezá a gestionar tu negocio hoy mismo
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Nombre y apellido */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Nombre */}
          <div>

            <label className="text-zinc-300 text-sm">
              Nombre
            </label>

            <div className="mt-2 relative">

              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >
                <HiOutlineUser />
              </span>

              <input
                type="text"
                name="firstName"
                value={
                  formData.firstName
                }
                onChange={handleChange}
                placeholder="Juan"
                className="
                  w-full h-14 rounded-2xl
                  bg-zinc-900/80
                  border border-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />

            </div>

          </div>

          {/* Apellido */}
          <div>

            <label className="text-zinc-300 text-sm">
              Apellido
            </label>

            <div className="mt-2 relative">

              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >
                <HiOutlineUser />
              </span>

              <input
                type="text"
                name="lastName"
                value={
                  formData.lastName
                }
                onChange={handleChange}
                placeholder="Pérez"
                className="
                  w-full h-14 rounded-2xl
                  bg-zinc-900/80
                  border border-white/10
                  pl-12 pr-4
                  text-white
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />

            </div>

          </div>

        </div>

        {/* Email */}
        <div>

          <label className="text-zinc-300 text-sm">
            Correo electrónico
          </label>

          <div className="mt-2 relative">

            <span
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-zinc-500 text-xl
              "
            >
              <HiOutlineMail />
            </span>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              className="
                w-full h-14 rounded-2xl
                bg-zinc-900/80
                border border-white/10
                pl-12 pr-4
                text-white
                outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

        </div>

        {/* Passwords */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Password */}
          <div>

            <label className="text-zinc-300 text-sm">
              Contraseña
            </label>

            <div className="mt-2 relative">

              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >
                <HiOutlineLockClosed />
              </span>

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={
                  formData.password
                }
                onChange={handleChange}
                placeholder="********"
                className="
                  w-full h-14 rounded-2xl
                  bg-zinc-900/80
                  border border-white/10
                  pl-12 pr-14
                  text-white
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >

                {showPassword ? (
                  <HiOutlineEyeOff />
                ) : (
                  <HiOutlineEye />
                )}

              </button>

            </div>

          </div>

          {/* Confirm */}
          <div>

            <label className="text-zinc-300 text-sm">
              Confirmar contraseña
            </label>

            <div className="mt-2 relative">

              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >
                <HiOutlineLockClosed />
              </span>

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                placeholder="********"
                className="
                  w-full h-14 rounded-2xl
                  bg-zinc-900/80
                  border border-white/10
                  pl-12 pr-14
                  text-white
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-zinc-500 text-xl
                "
              >

                {showConfirmPassword ? (
                  <HiOutlineEyeOff />
                ) : (
                  <HiOutlineEye />
                )}

              </button>

            </div>

          </div>

        </div>

        {/* Terms */}
        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="
              w-5 h-5
              accent-blue-600
            "
          />

          <span className="text-zinc-400 text-sm">
            Acepto los términos y condiciones
          </span>

        </label>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full h-14 rounded-2xl
            bg-blue-600 hover:bg-blue-700
            transition
            text-white font-bold text-lg
          "
        >
          Crear cuenta
        </button>

      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">

        <div className="flex-1 h-px bg-white/10" />

        <span className="text-zinc-500 text-sm">
          o continuar con
        </span>

        <div className="flex-1 h-px bg-white/10" />

      </div>

      {/* Google */}
      <button
        className="
          w-full h-14 rounded-2xl
          border border-white/10
          bg-zinc-900/80
          hover:bg-zinc-800
          transition
          flex items-center justify-center gap-3
          text-white font-semibold
        "
      >

        <FcGoogle className="text-2xl" />

        Continuar con Google

      </button>

      {/* Login */}
      <p className="text-zinc-500 text-center mt-8">

        ¿Ya tenés cuenta?{' '}

        <Link
          to="/login"
          className="
            text-blue-500
            hover:text-blue-400
            transition
          "
        >
          Iniciar sesión
        </Link>

      </p>

    </div>
  )
}

export default RegisterForm