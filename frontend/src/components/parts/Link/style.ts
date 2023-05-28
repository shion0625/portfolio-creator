import { Link } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

export const MuiLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: alpha(theme.palette.text.primary, 1),
  cursor: 'pointer',
}))
