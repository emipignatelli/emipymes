import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import LandingPage from '../pages/LandingPage'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

import DashboardHome from '../pages/dashboard/DasboardHome'
import InventoryPage from '../pages/dashboard/InventoryPage'
import OrdersPage from '../pages/dashboard/OrdersPage'
import InvoicesPage from '../pages/dashboard/InvoicesPage'
import UserPanel from '../pages/dashboard/UserPanel'

import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Públicas */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Privadas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <DashboardHome />

            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>

              <InventoryPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>

              <OrdersPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>

              <InvoicesPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>

              <UserPanel />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter