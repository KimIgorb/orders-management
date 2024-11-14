import { useState, useEffect } from 'react';
import { IOrderDetails } from '../types';
import { enqueueSnackbar } from 'notistack';

export const useProductArr = (initialProducts: IOrderDetails[]) => {
  const [productArr, setProductArr] = useState<IOrderDetails[]>(initialProducts!);

  useEffect(() => {
    if (JSON.stringify(initialProducts) !== JSON.stringify(productArr)) {
      setProductArr(initialProducts);
    }
  }, [initialProducts]);

  const handleAddProduct = (newProduct: IOrderDetails) => {
    const productExist = productArr.find(item => item.id === newProduct.id);

    if (productExist) {
      enqueueSnackbar('Продукт уже добавлен к заказу', { variant: 'error' });
      return;
    }

    setProductArr(prev => [...prev, { ...newProduct }]);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setProductArr(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId: number) => {
    setProductArr(prev => prev.filter(item => item.id !== productId));
  };

  return {
    productArr,
    handleAddProduct,
    handleQuantityChange,
    handleDeleteProduct,
    setProductArr
  };
};
