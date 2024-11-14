import { useState } from 'react';
import { IOrders } from '../types';

const useOrderModals = () => {
  const [isOpenAddModal, seIsOpenAddModal] = useState(false)
  const [isDialogDelOpen, setIsDialogDelOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<null | number>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState({});

  const handleOpenDialog = (id: number) => {
    setIsDialogDelOpen(true);
    setIdToDelete(id);
  };

  const handleOpenEdit = (order: IOrders) => {
    setIsEditOpen(true);
    setOrderToEdit(order);
  };

 

  return {
    isOpenAddModal,
    seIsOpenAddModal,
    isDialogDelOpen,
    setIsDialogDelOpen,
    isEditOpen,
    setIsEditOpen,
    orderToEdit,
    idToDelete,
    handleOpenDialog,
    handleOpenEdit,
  };
};

export default useOrderModals;
