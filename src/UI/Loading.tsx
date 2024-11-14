import { Box, LinearProgress, CircularProgress } from '@mui/material'

interface IProps {
  type: 'linear' | 'circle';
  positionCenter?: boolean;
  color: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: number;
}

const Loading = ({type, positionCenter, color, size}:IProps) => {

  const typeOfLoading = () => {
    if(type === 'linear') {
      return <LinearProgress color={color}/>
    } else {
      return <CircularProgress size={size} color={color}/>
    }
  }

  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <Box sx={positionCenter ? styles : {}}>
      {typeOfLoading()}
    </Box>
  )
}

export default Loading