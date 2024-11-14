import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'; 

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute = ({children}:IProps) => {
  
  const auth = useSelector((state: RootState) => state.auth.isAuth)

  return auth ? children : <Navigate to='/login'/>
}

export default ProtectedRoute