import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

interface IFormFieldProps {
  name: string;
  label: string;
  control: any;  
  rules: object;
  errors: any;  
  isMedium: boolean
}

const FormTextField = ({ name, label, control, rules, errors, isMedium }: IFormFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          size={isMedium ? 'medium' : 'small'}
          margin="normal"
          error={!!errors[name]?.message}
          helperText={errors[name]?.message}
          value={field.value || ''}
        />
      )}
    />
  );
}

export default FormTextField