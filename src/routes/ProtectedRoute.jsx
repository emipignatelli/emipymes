import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function ProtectedRoute({
  children,
}) {
  const { user } = useAuth()

  // Si NO hay usuario
  if (!user) {
    return <Navigate to="/login" />
  }

  // Si está logueado
  return children
}

export default ProtectedRoute