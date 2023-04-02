import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const ChildrenBox = styled(Box)(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: '24',
  p: 4,
}))
