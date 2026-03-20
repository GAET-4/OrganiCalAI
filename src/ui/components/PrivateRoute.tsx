import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/application/auth/AuthContext'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
