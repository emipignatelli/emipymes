import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const AuthContext = createContext()

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null)

  // Mantener sesión
  useEffect(() => {
    const savedUser =
      localStorage.getItem('loggedUser')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Login
  const login = (
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem('users')
      ) || []

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    )

    if (!foundUser) {
      return {
        success: false,
        message:
          'Credenciales incorrectas',
      }
    }

    // Usuario logueado
    const loggedUser = {
      ...foundUser,

      // Key única por usuario
      storageKey:
        foundUser.email.replace(
          /[@.]/g,
          '_'
        ),
    }

    // Guardar sesión
    localStorage.setItem(
      'loggedUser',
      JSON.stringify(loggedUser)
    )

    setUser(loggedUser)

    return {
      success: true,
    }
  }

  // Register
  const register = (newUser) => {
    const users =
      JSON.parse(
        localStorage.getItem('users')
      ) || []

    const userExists = users.find(
      (user) =>
        user.email === newUser.email
    )

    if (userExists) {
      return {
        success: false,
        message:
          'El usuario ya existe',
      }
    }

    const updatedUsers = [
      ...users,
      newUser,
    ]

    localStorage.setItem(
      'users',
      JSON.stringify(updatedUsers)
    )

    return {
      success: true,
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem(
      'loggedUser'
    )

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}