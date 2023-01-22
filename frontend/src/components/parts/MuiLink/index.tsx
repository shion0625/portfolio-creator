import { Link } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

const MuiLink = styled(Link)(({ theme }) => ({
  underline: 'none',
  textDecoration: 'none',
  color: alpha(theme.palette.text.primary, 1),
  cursor: 'pointer',
}))

export default MuiLink
