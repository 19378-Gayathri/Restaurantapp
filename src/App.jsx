import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import LoginPage from './pages/LoginPage'

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <p style={{ textAlign:'center', padding:'3rem' }}>Loading...</p>
  if (!isSignedIn) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/restaurant/:id" element={
            <ProtectedRoute><MenuPage /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}