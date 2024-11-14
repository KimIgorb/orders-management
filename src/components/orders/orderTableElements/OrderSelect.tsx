import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { useSetStatusMutation } from '../../../redux/orders/ordersApi'
import Loading from '../../../UI/Loading'
import { selectItems } from '../../../helpers/tableHelper'
import { enqueueSnackbar } from 'notistack'

interface IProps {
  setEdit: (data: boolean) => void
  setInitialStatus: (data: string) => void
  initialStatus: string;
  id?: number,
}

const OrderSelect = ({ setEdit, setInitialStatus, initialStatus, id }: IProps) => {

  const [setOrderStatus, { isLoading }] = useSetStatusMutation()


  const handleChange = async (status: string) => {
    
    const res = await setOrderStatus({ id, status }).unwrap();

    setInitialStatus(status)
    if (res) {
      enqueueSnackbar('Статус успешно изменён', { variant: 'success' });
    }
    setEdit(false)
  };

  if (isLoading) {
    return (
      <Loading type='linear' color='primary' />
    )
  }

  return (
    <>
      <FormControl variant='standard' sx={{ width: 1 }} size='small'>
        <Select
          value={initialStatus}
          onChange={(e) => handleChange(e.target.value)}
          displayEmpty
          label={'Статус заказа'}
        >
          <MenuItem value={initialStatus} disabled>
            <Typography variant='subtitle2' component='p'>
              {initialStatus}
            </Typography>
          </MenuItem>
          {selectItems.map(el => (
            el.value !== initialStatus && (
              <MenuItem key={el.id} value={el.value}>
                <Typography variant='subtitle2' component='p' >
                  {el.value}
                </Typography>
              </MenuItem>
            )
          ))}
        </Select>
      </FormControl >
    </>
  )
}

export default OrderSelect