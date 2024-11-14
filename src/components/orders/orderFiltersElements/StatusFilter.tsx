import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { selectItems } from '../../../helpers/tableHelper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface IProps {
  selectedStatus: string
  setSelectedStatus: (data: string) => void
}

const StatusFilter = ({selectedStatus, setSelectedStatus}:IProps) => {

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value)
  }

  return (
    <FormControl size='small'>
      <Typography gutterBottom >Фильтрация по статусу заказа</Typography>
      <Select
        displayEmpty
        value={selectedStatus}
        onChange={handleChangeStatus}
        IconComponent={ExpandMoreIcon}
        renderValue={(selectedStatus) => {
          if (selectedStatus) {
            return selectedStatus
          }
          return <em>Выберете статус</em>
        }}
      >
        {selectItems.map(item => (
          <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

//  sx={{ width: '300px', pt: 1 }}

export default StatusFilter