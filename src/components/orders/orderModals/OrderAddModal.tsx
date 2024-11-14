import { Box, Button, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { addOrderFields } from '../../../helpers/formFields';
import FormTextField from '../../../UI/FormTextField';
import ModalProductSelect from './orderModalsElements/ModalProductSelect';
import { useState } from 'react';
import ModalProducts from './orderModalsElements/ModalProducts';
import { useProductArr } from '../../../hooks/useProductArr';
import useGenerateOrderData from '../../../hooks/useGenerateOrderData';
import { useTotalAmount } from '../../../hooks/useTotalAmount';
import { enqueueSnackbar } from 'notistack';
import { useAddNewOrderMutation } from '../../../redux/orders/ordersApi';

interface IProps {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void
}

interface IFormAdd {
  name: string;
  surname: string;
}

const OrderAddModal = ({ isOpen, setIsOpen }: IProps) => {

  const [initialArr] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { generateOrderNumber, getCurrentDate } = useGenerateOrderData();

  const {
    productArr,
    handleAddProduct,
    handleQuantityChange,
    handleDeleteProduct,
    setProductArr
  } = useProductArr(initialArr)
  const totalAmount = useTotalAmount(productArr)

  const [addNewOrder] = useAddNewOrderMutation()

  const { handleSubmit, control, reset } = useForm<IFormAdd>()
  const { errors } = useFormState({
    control
  })

  const onSubmit: SubmitHandler<IFormAdd> = async (data) => {
    if (!productArr.length) {
      enqueueSnackbar('Добавьте хотя бы один товар', { variant: 'error' });
      return;
    }

    const allPositive = productArr.every(item => item.quantity > 0);
    if (!allPositive) {
      enqueueSnackbar('Укажите количество для каждого товара.', { variant: 'error' });
      return;
    }

    const newOrder = {
      orderNumber: generateOrderNumber(),
      userName: `${data.name} ${data.surname}`,
      orderTime: getCurrentDate(),
      orderStatus: 'Ожидание оплаты',
      totalPrice: totalAmount,
      orderDetails: productArr
    }


    await addNewOrder(newOrder).unwrap();
    enqueueSnackbar('Заказ успешно добавлен', { variant: 'success' });

    handleClose();
  }
  const handleClose = () => {
    reset();
    setIsOpen(false)
    setProductArr([])
    setShowAddProduct(false)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{ background: '#fff', py: 2, px: 3, minWidth: '500px' }}
        component={Paper}
      >
        <Typography
          variant='h6'
          component='h3'
          align='center'
          gutterBottom
          color='primary'
        >
          Добавление заказа
        </Typography>
        <Box
          sx={{ minHeight: 450, display: 'flex', flexDirection: 'column' }}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            {addOrderFields.map(field => (
              <FormTextField
                key={field.name}
                name={field.name}
                label={field.label}
                control={control}
                rules={field.validation}
                errors={errors}
                isMedium={false}
              />
            ))}
          </Box>
          {productArr.map(product => (
            <ModalProducts
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteProduct}
            />
          ))
          }

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
            <Button
              sx={{ mr: 2 }}
              type="submit"
              variant="contained"
              color="primary"
              size='small'
            >
              Добавить
            </Button>
            <Button size='small' variant="contained" onClick={handleClose} color='error'>
              Отмена
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal >
  )
}

export default OrderAddModal