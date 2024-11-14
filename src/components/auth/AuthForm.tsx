import { Box, Button } from '@mui/material'
import { authFields } from '../../helpers/formFields';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/authSlice'
import FormTextField from '../../UI/FormTextField';

interface IFormFields {
  login: string;
  password: string
}

const AuthForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm<IFormFields>()
  const { errors } = useFormState({
    control
  })

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    if (data) {
      dispatch(login())
      localStorage.setItem('isAuth', 'true')
      navigate('/')
    }
  }
  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component='form'
    >
      <Box>
        {authFields.map(field => (
          <FormTextField
            key={field.name}
            name={field.name}
            label={field.label}
            control={control}
            rules={field.validation}
            errors={errors}
            isMedium={true}
          />
        ))}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '20px',
          width: '50%',
          padding: '10px',
          mt: 2
        }}
      >
        Войти
      </Button>
    </Box>
  )
}

export default AuthForm