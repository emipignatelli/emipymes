import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

import DashboardHome from '../pages/dashboard/DasboardHome'
import InventoryPage from '../pages/dashboard/InventoryPage'
import OrdersPage from '../pages/dashboard/OrdersPage'
import InvoicesPage from '../pages/dashboard/InvoicesPage'
import UserPanel from '../pages/dashboard/UserPanel'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/user" element={<UserPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter