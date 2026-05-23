import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-20 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[140px]" />

      <div className="relative z-10 w-full flex items-center justify-center">
        <RegisterForm />
      </div>

    </div>
  )
}

export default RegisterPage