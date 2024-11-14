import { Box, Button } from '@mui/material'

interface IProps {
  openDialog: () => void
  openEdit: () => void
}

const OrdersActionBtns = ({ openDialog, openEdit }: IProps) => {

  return (
    <Box>
      <Button
        sx={{ mr: 2 }}
        size='small'
        variant="contained"
        onClick={() => openEdit()}
      >
        Изменить
      </Button>
      <Button
        size='small'
        variant="contained"
        color='error'
        onClick={() => openDialog()}
      >
        Удалить
      </Button>
    </Box>
  )
}

export default OrdersActionBtns