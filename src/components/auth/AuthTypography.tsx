import { Typography } from '@mui/material'


const AuthTypography = () => {
  return (
    <>
      <Typography
        sx={{ mb: 0 }}
        variant='h4'
        align='center'
        component='p'
        color='primary'
      >
        Войдите
      </Typography>
      <Typography
        variant='subtitle1'
        component='p'
        align='center'
        color='textSecondary'
      >
        Что-бы получить доступ
      </Typography>
    </>

  )
}

export default AuthTypography