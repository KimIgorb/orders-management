import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { IOrderDetails } from '../../../../types';

interface IProps {
  product: IOrderDetails
  onQuantityChange: (productId: number, newQuantity: number) => void
  onDelete: (productId: number) => void
}

const ModalProducts = ({ product, onQuantityChange, onDelete }: IProps) => {

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);

    if (newQuantity < 0) {
      return;
    }

    onQuantityChange(product.id, newQuantity)
  };

  return (
    <Box
      key={product.productName}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgb(133, 133, 133)', p: 1 }}
    >
      <Typography>
        {product.productName}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          sx={{ width: '80px' }}
          type='number'
          value={product.quantity}
          onChange={handleQuantityChange}
          size='small'
          error={product.quantity === 0 ? true : false}
        />
        <IconButton onClick={() => onDelete(product.id)}>
          <Tooltip title='Удалить товар' placement="top" arrow>
            <CloseIcon color='error' />
          </Tooltip>
        </IconButton>
      </Box>
    </Box>
  )
}

export default ModalProducts