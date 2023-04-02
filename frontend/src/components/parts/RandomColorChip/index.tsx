import { Chip } from '@mui/material'
import { Color } from '~/constant/constant'

type RandomColorChipProps = {
  content: string
}

const RandomColorChip: React.FC<RandomColorChipProps> = ({ content }) => {
  const color = Color
  const num = Math.floor(Math.random() * color.length)
  return <Chip label={content} variant='outlined' color={color[num]} />
}

export default RandomColorChip
