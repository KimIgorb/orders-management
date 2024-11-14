import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useGetProductsQuery } from '../../../../redux/products/productsApi'
import { useState } from 'react'
import { IOrderDetails } from '../../../../types'

interface IProps {
  onAdd: (data: IOrderDetails) => void
  onClose: (data: boolean) => void
}

const ModalProductSelect = ({ onClose, onAdd }: IProps) => {

  const { data = [] } = useGetProductsQuery()
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleChange = (event: SelectChangeEvent) => {

    const selectedProductObj = data.find(item => item.productName === event.target.value);
    if (selectedProductObj) {
      setSelectedProduct(selectedProductObj.productName);
      onAdd(selectedProductObj)
      onClose(false);
    }
  };

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, width: 1, mt: 3 }}>
        <Select
          displayEmpty
          value={selectedProduct}
          onChange={handleChange}
          renderValue={(selectedProduct) => {
            if (selectedProduct) {
              return selectedProduct;
            }
            return <em>Выберете товар</em>
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: '300px',
              },
            },
          }}
        >
          {data && data.map(item => (
            <MenuItem key={item.id} value={item.productName}>
              {item.productName}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
      <Box textAlign='right'>
        <Button onClick={() => onClose(false)} size='small' color='error'>
          Отмена
        </Button>
      </Box>
    </Box>
  )
}

export default ModalProductSelect
