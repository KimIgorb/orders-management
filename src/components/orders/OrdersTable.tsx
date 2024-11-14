import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetOrdersQuery } from '../../redux/orders/ordersApi'
import { tableTitle } from '../../helpers/tableHelper'
import { useState } from 'react'
import { IOrders } from '../../types';
import Loading from '../../UI/Loading'
import OrdersTableRow from './OrdersTableRow'
import OrderTablePagination from './orderTableElements/OrderTablePagination'
import OrderTableHeaders from './orderTableElements/OrderTableHeaders'
import OrderDialogModal from './orderModals/OrderDialogModal'
import OrderEditModal from './orderModals/OrderEditModal'
import OrderFilters from './OrderFilters'
import useOrderFilters from '../../hooks/useOrderFilters'
import useOrderModals from '../../hooks/useOrderModals';
import OrderAddModal from './orderModals/OrderAddModal';

const OrdersTable = () => {

  const { data = [], isLoading } = useGetOrdersQuery();

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    filteredData,
    handleFilterStatus,
    handleDateRangeFilter,
    handleSearchByNameOrNumber,
    resetFilter,
  } = useOrderFilters(data);

  const {
    isOpenAddModal,
    seIsOpenAddModal,
    isDialogDelOpen,
    setIsDialogDelOpen,
    isEditOpen,
    setIsEditOpen,
    orderToEdit,
    idToDelete,
    handleOpenDialog,
    handleOpenEdit
  } = useOrderModals();


  if (isLoading) {
    return (
      <Loading type='circle' positionCenter size={100} color='primary' />
    )
  }

  return (
    <>
      <OrderFilters
        filterStatus={handleFilterStatus}
        filterDateRange={handleDateRangeFilter}
        onSearch={handleSearchByNameOrNumber}
        onReset={resetFilter}
      />

      <Paper>
        <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1150 }}>
            <TableHead>
              <TableRow sx={{ background: '#1976d2' }}>
                <TableCell />
                <OrderTableHeaders headersArr={tableTitle} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <OrdersTableRow key={row.id} row={row} openDialog={handleOpenDialog} openEdit={handleOpenEdit} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <OrderTablePagination
          dataLength={data.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
      <Box sx={{ alignSelf: 'center', mt: 2, minWidth: '300px' }}>
        <Button
          sx={{
            pt: { xs: '8px', sm: '10px' },
            pb: { xs: '8px', sm: '10px' }, 
          }}
          fullWidth
          variant='contained'
          size='large'
          onClick={() => seIsOpenAddModal(true)}
        >
          Добавить заказ
        </Button>
      </Box>
      <OrderDialogModal isOpen={isDialogDelOpen} setIsOpen={setIsDialogDelOpen} id={idToDelete as number} />
      <OrderEditModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} orderEdit={orderToEdit as IOrders} />
      <OrderAddModal isOpen={isOpenAddModal} setIsOpen={seIsOpenAddModal} />
    </>

  )
}

export default OrdersTable