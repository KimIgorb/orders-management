import { Box, TextField, Typography } from '@mui/material'

interface IProps {
  startDate: string;
  setStartDate: (data: string) => void
  endDate: string
  setEndDate: (data: string) => void
}


const CreateDateRangeFilter = ({ startDate, setStartDate, endDate, setEndDate }: IProps) => {

  return (
    <Box>
      <Typography gutterBottom>Фильтрация по дате создания</Typography>
      <Box>
        <TextField
          sx={{ marginRight: { xs: 1, sm: 1, md: 1, lg: 1 } }}
          size='small'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          size='small'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Box>
    </Box>
  )
}

// textAlign="left" sx={{ pt: 1 }}
export default CreateDateRangeFilter