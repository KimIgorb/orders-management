import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid2';
import StatusFilter from './orderFiltersElements/StatusFilter'
import { useEffect, useState } from 'react'
import CreateDateRangeFilter from './orderFiltersElements/CreateDateRangeFilter'
import Search from './orderFiltersElements/Search'

interface IProps {
  filterStatus: (data: string) => void
  filterDateRange: (startDate: string, endDate: string) => void
  onSearch: (type: string, val: string) => void
  onReset: () => void
}

const OrderFilters = ({ filterStatus, filterDateRange, onSearch, onReset }: IProps) => {

  const [selectedStatus, setSelectedStatus] = useState('')

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [searchType, setSearchType] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (startDate && endDate) {
      filterDateRange(startDate, endDate);
    }
  }, [startDate, endDate, filterDateRange]);

  useEffect(() => {
    filterStatus(selectedStatus)
  }, [selectedStatus])

  const handleReset = () => {
    setSelectedStatus('');
    setStartDate('');
    setEndDate('');
    setSearchType('');
    setSearchText('');
    onReset()
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={{ xs: 1 }} columns={{ lg: 12 }} sx={{ alignItems: 'end' }}>
        <Grid size={4}>
          <CreateDateRangeFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
        <Grid size={4}>
          <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </Grid>
        <Grid size={4}>
          <Search
            onSearch={onSearch}
            searchType={searchType}
            setSearchType={setSearchType}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <Button
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            padding: { xs: '4px 8px', sm: '6px 16px' },
          }}
          onClick={handleReset}
          variant='contained'
        >Сбросить фильтр</Button>
      </Box>
    </Box>

  )
}

export default OrderFilters