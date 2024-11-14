import { TablePagination } from '@mui/material'

interface IProps {
  dataLength: number,
  page: number,
  setPage: (data: number) => void
  rowsPerPage: number
  setRowsPerPage: (data: number) => void
}

const OrderTablePagination = (
  {
    dataLength,
    page, setPage,
    rowsPerPage, setRowsPerPage
  }: IProps) => {

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15]}
      component="div"
      count={dataLength}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default OrderTablePagination