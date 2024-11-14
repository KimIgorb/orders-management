import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect } from 'react'
import { useRemoveOrderMutation } from '../../../redux/orders/ordersApi';
import { enqueueSnackbar } from 'notistack';

interface IProps {
  id: number;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void
}

const OrderDialogModal = ({ isOpen, setIsOpen, id }: IProps) => {

  const [removeOrder, { isSuccess }] = useRemoveOrderMutation()

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleRemoveOrder = async () => {
    await removeOrder({ id }).unwrap()
    handleClose()
  }

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Заказ успешно удален', { variant: 'success' });
    }
  }, [isSuccess, enqueueSnackbar]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{ textAlign: 'center' }}
      closeAfterTransition
    >
      <DialogTitle>
        Удалить заказ
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить данный заказ
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}
        disableSpacing
      >
        <Button
          variant="contained"
          color='error'
          onClick={handleRemoveOrder}
        >
          Удалить
        </Button>
        <Button
          variant='text'
          size='small'
          onClick={handleClose}
        >
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDialogModal