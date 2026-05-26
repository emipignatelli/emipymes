import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'

import { FcGoogle } from 'react-icons/fc'

import toast from 'react-hot-toast'

import { useAuth } from '../../context/AuthContext'

function LoginForm() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    })

  // Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación
    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        'Completá todos los campos'
      )

      return
    }

    // Login
    const result = login(
      formData.email,
      formData.password
    )

    // Error
    if (!result.success) {
      toast.error(result.message)

      return
    }

    // Success
    toast.success(
      'Inicio de sesión exitoso'
    )

    navigate('/dashboard')
  }

  return (
    <div
      className="
        w-full max-w-md
        rounded-[32px]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-2xl
      "
    >

      {/* Header */}
      <div className="text-center mb-10">

        <h2 className="text-white text-4xl font-black">
          Bienvenido
        </h2>

        <p className="text-zinc-400 mt-4">
          Ingresá a tu cuenta para continuar
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

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
              value={formData.password}
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

        {/* Forgot */}
        <div className="flex justify-end">

          <button
            type="button"
            className="
              text-blue-500
              hover:text-blue-400
              transition
              text-sm
            "
          >
            ¿Olvidaste tu contraseña?
          </button>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="
            w-full h-14 rounded-2xl
            bg-blue-600 hover:bg-blue-700
            transition
            text-white font-bold text-lg
          "
        >
          Ingresar
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

      {/* Register */}
      <p className="text-zinc-500 text-center mt-8">

        ¿No tenés cuenta?{' '}

        <Link
          to="/register"
          className="
            text-blue-500
            hover:text-blue-400
            transition
          "
        >
          Crear cuenta
        </Link>

      </p>

    </div>
  )
}

export default LoginForm