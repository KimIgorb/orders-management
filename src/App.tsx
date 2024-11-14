import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import OrdersPage from './pages/OrdersPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import useAuthRedirect from './hooks/useAuthRedirect'


function App() {

  useAuthRedirect() // проверка на авторизацию (useEffect)
  
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      } />
      <Route path='/login' element={<AuthPage />} />
    </Routes>
  )
}

export default App
