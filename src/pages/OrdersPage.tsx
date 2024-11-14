import { Box, Container, Typography } from '@mui/material'
import OrdersTable from '../components/orders/OrdersTable'

const OrdersPage = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ pt: 5, mb: 5 }}>
        <Typography
          variant='h2'
          component="h1"
          textAlign='center'
          color='primary'
          sx={{
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
          Таблица заказов
        </Typography>
      </Box>
      <OrdersTable />
    </Container>
  )
}

export default OrdersPage