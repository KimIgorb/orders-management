import { TableCell, Typography } from '@mui/material'

interface IProps {
  text: string | number
  isCenter?: boolean
}

const OrderTableCell = ({text, isCenter}:IProps) => {
  return (
    <>
      <TableCell align={isCenter ? 'center' : 'left'}>
        <Typography variant='subtitle2' component='p'>
          {text}
        </Typography>
      </TableCell>
    </>
  ) 
}

export default OrderTableCell