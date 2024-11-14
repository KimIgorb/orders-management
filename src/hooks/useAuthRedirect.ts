import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/authSlice';


const useAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      dispatch(login());
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsCheckingAuth(false);
  }, [navigate, dispatch]);

  return isCheckingAuth;
};

export default useAuthRedirect;