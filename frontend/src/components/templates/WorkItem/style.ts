import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Item: any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.text.reverse,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: 500,
  height: 500,
  overflowY: 'auto',
}))
