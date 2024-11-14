import { IOrders, IOrderDetails } from '../types';
import { enqueueSnackbar } from 'notistack';
import { useEditOrderMutation } from '../redux/orders/ordersApi';

export const useOrderEdit = (
  orderEdit: IOrders,
  productArr: IOrderDetails[],
  totalAmount: number,
  onClose: () => void
) => {
  const [saveEdit] = useEditOrderMutation();

  const handleSaveEdit = async () => {
    const allPositive = productArr.every(item => item.quantity > 0);
    if (!allPositive) {
      enqueueSnackbar('Укажите кол-во каждого товара', { variant: 'error' });
      return;
    }

    const isChanged = JSON.stringify(orderEdit.orderDetails) !== JSON.stringify(productArr);
    if (!isChanged) {
      enqueueSnackbar('Изменений не было', { variant: 'info' });
      onClose();
      return;
    }

    enqueueSnackbar('Заказ успешно изменен', { variant: 'success' });
    await saveEdit({ id: orderEdit.id, editData: productArr, newTotalPrice: totalAmount });

    onClose();
  };

  return { handleSaveEdit };
};
