import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { IOrderDetails } from '../../types'
import OrderTableCell from './orderTableElements/OrderTableCell'
import { detailedTableTitle } from '../../helpers/tableHelper'
import OrderTableHeaders from './orderTableElements/OrderTableHeaders'


interface IProps {
  details: IOrderDetails[]
  isOpen: boolean
}

const OrderCollapse = ({ details, isOpen }: IProps) => {
  return (
    <TableRow>
      <TableCell sx={{ pb: 0, pt: 0 }} colSpan={7}>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <Box sx={{ py: 2 }}>
            <Typography
              variant='h4'
              component='p'
              sx={{ pl: 2 }}
              gutterBottom
            >
              Подробное описание заказа
            </Typography>
            <Table size='small' aria-label='purchases'>
              <TableHead>
                <TableRow sx={{background: '#1976d2'}}>
                  <OrderTableHeaders headersArr={detailedTableTitle}/>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map(el => (
                  <TableRow key={el.id}>
                    <OrderTableCell text={el.productName} />
                    <OrderTableCell text={el.quantity} />
                    <OrderTableCell text={el.productPrice} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default OrderCollapse