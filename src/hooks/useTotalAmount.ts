import { useEffect, useState } from 'react';
import { IOrderDetails } from '../types';

export const useTotalAmount = (productArr: IOrderDetails[]) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const newTotalAmount = productArr.reduce(
      (sum, product) => sum + product.quantity * product.productPrice,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [productArr]);

  return totalAmount;
};
