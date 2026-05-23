import LoginForm from '../components/auth/LoginForm'

function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 w-full flex items-center justify-center">
        <LoginForm />
      </div>

    </div>
  )
}

export default LoginPage