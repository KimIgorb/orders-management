import { Box, Button, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material'
import { IOrders } from '../../../types';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ModalProductSelect from './orderModalsElements/ModalProductSelect';
import ModalProducts from './orderModalsElements/ModalProducts';
import { useProductArr } from '../../../hooks/useProductArr';
import { useTotalAmount } from '../../../hooks/useTotalAmount';
import { useOrderEdit } from '../../../hooks/useOrderEdit';

interface IProps {
  isOpen: boolean
  setIsOpen: (data: boolean) => void
  orderEdit: IOrders
}

const OrderEditModal = ({ isOpen, setIsOpen, orderEdit }: IProps) => {

  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleClose = () => {
    setIsOpen(false)
    setShowAddProduct(false)
    setProductArr(orderEdit.orderDetails || [])
  }

  const {
    productArr,
    handleAddProduct,
    handleQuantityChange,
    handleDeleteProduct,
    setProductArr,
  } = useProductArr(orderEdit.orderDetails || []) // добавления товара , удаление товара и изменение кол-ва товара 
  const totalAmount = useTotalAmount(productArr); // подсчет общей суммы товаров 
  const { handleSaveEdit } = useOrderEdit(orderEdit, productArr, totalAmount, handleClose); // сохроненеие изменений

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{ background: '#fff', py: 2, px: 3, minWidth: { xs: '350px', md: '500px'} }}
        component={Paper}
      >
        <Typography variant='h6' component='h3' align='center' gutterBottom color='primary'>
          Редактирование заказа
        </Typography>
        <Box sx={{ minHeight: 450, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom>
            {`Клиент: ${orderEdit.userName}`}
          </Typography>
          <Typography gutterBottom>
            {`Заказ № ${orderEdit.orderNumber}`}
          </Typography>

          <Box>
            {productArr.length > 0 &&
              productArr?.map((product) => (
                <ModalProducts
                  key={product.id}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDeleteProduct} />
              ))}
          </Box>

          {showAddProduct && (
            <ModalProductSelect onClose={setShowAddProduct} onAdd={handleAddProduct} />
          )}

          <Box textAlign="center">
            <IconButton size="large" onClick={() => setShowAddProduct(true)}>
              {!showAddProduct &&
                <Tooltip title='Добавить товар' placement="top" arrow>
                  <AddIcon color='primary' fontSize='large' />
                </Tooltip>
              }
            </IconButton>
          </Box>
          <Box textAlign='right' sx={{ marginTop: 'auto' }}>
            <Button size='small' sx={{ mr: 2 }} variant="contained" onClick={handleSaveEdit}>
              Изменить
            </Button>
            <Button size='small' variant="contained" onClick={handleClose} color='error'>
              Отмена
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default OrderEditModal