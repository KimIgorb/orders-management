import { TableCell, Typography } from '@mui/material'

interface IProps {
  headersArr: {id: number, title: string}[]
}

const OrderTableHeaders = ({ headersArr }:IProps) => {
  return (
    <>
      {headersArr.map(el => (
        <TableCell key={el.id} align={el.title === 'Действия' ? 'center' : 'left'}>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{fontWeight: 600, color: '#fff'}}
          >
            {el.title}
          </Typography>
        </TableCell>
      ))}
    </>
  )
}

export default OrderTableHeaders