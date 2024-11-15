import { Box } from '@mui/material'
import AuthTypography from '../components/auth/AuthTypography';
import AuthForm from '../components/auth/AuthForm';
import useAuthRedirect from '../hooks/useAuthRedirect'


const AuthPage = () => {

  const isCheckingAuth = useAuthRedirect()

  if (isCheckingAuth) return null;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Box sx={{ width: '25%', textAlign: 'center', minWidth: '300px' }}>
        <AuthTypography />
        <AuthForm />
      </Box>
    </Box>

  )
}

export default AuthPage