import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'

interface IProps {
  onSearch: (type: string, val: string) => void
  searchType: string
  setSearchType: (data: string) => void
  searchText: string;
  setSearchText: (data: string) => void
}

const Search = ({ onSearch, searchType, setSearchType, searchText, setSearchText }: IProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType((event.target as HTMLInputElement).value)
    setSearchText('')
    onSearch('', '');
  }

  const handleTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value)

    if (value === '') {
      onSearch('', '');
    } else {
      onSearch(searchType, value);
    }
  }

  return (
    <FormControl>
      <RadioGroup row onChange={handleChange} value={searchType}>
        <FormControlLabel
          value='name'
          control={<Radio size="small" />}
          label='Поиск по имени'
        />
        <FormControlLabel
          value='orderNumber'
          control={<Radio size="small" />}
          label='Поиск по номеру'
        />
      </RadioGroup>
      <TextField
        size='small'
        value={searchText}
        onChange={handleTextField}
        disabled={!searchType}
        title={!searchType ? "Выберите вариант поиска" : ""}
      />
    </FormControl>
  )
}

export default Search