import { useState } from 'react'
import { IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IOrders } from '../../types';
import EditIcon from '@mui/icons-material/Edit';
import OrderCollapse from './OrderCollapse';
import OrderSelect from './orderTableElements/OrderSelect';
import OrderTableCell from './orderTableElements/OrderTableCell';
import OrdersActionBtns from './orderTableElements/OrdersActionBtns';

interface IProps {
  row: IOrders
  openDialog: (data: number) => void
  openEdit: (data: IOrders) => void
}

const OrdersTableRow = ({ row, openDialog, openEdit }: IProps) => {

  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const [isEditStatus, setIsEditStatus] = useState(false)
  const [status, setStatus] = useState(row.orderStatus)
 

  const toggleOpen = () => setIsCollapseOpen(prev => !prev);

  const statusDisplay = () => {
    return isEditStatus ? (
      <OrderSelect
        id={row.id}
        initialStatus={status}
        setInitialStatus={setStatus}
        setEdit={setIsEditStatus}
      />
    ) : (
      <Typography
        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        variant='subtitle2'
        component='p'
      >
        {status}
        <Tooltip title='Изменить статус заказа' arrow placement="top">
          <EditIcon fontSize='small' onClick={() => setIsEditStatus(true)}  color='info'/>
        </Tooltip>
      </Typography>
    );
  };

  return (
    <>
      <TableRow sx={{ borderBottom: 'none' }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={toggleOpen}
          >
            {isCollapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <OrderTableCell text={row.orderNumber}/>
        <OrderTableCell text={row.orderTime}/>
        <TableCell>{statusDisplay()}</TableCell>
        <OrderTableCell text={row.userName}/>
        <OrderTableCell isCenter text={row.totalPrice}/>
        <TableCell align='center'>
          <OrdersActionBtns openDialog={() => openDialog(row.id!)} openEdit={() => openEdit(row)}/>
        </TableCell>
      </TableRow>
      <OrderCollapse isOpen={isCollapseOpen} details={row.orderDetails}/>
    </>
  )
}

export default OrdersTableRow