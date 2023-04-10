import React from 'react'
import {
  InvertColors as InvertColorsIcon,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { usePaletteMode } from '~/stores/PaletteMode'


const PaletteModeButton: React.FC = () => {
  const [, , toggleChangePaletteMode] = usePaletteMode()

  return (
    <IconButton color='inherit' onClick={toggleChangePaletteMode}>
      <InvertColorsIcon />
    </IconButton>
  )
}

export default PaletteModeButton
