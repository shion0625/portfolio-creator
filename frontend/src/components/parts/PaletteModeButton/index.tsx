import { InvertColors as InvertColorsIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { usePaletteMode } from '~/stores/PaletteMode'

const PaletteModeButton: React.FC = () => {
  const [color, , toggleChangePaletteMode] = usePaletteMode()

  return (
    <IconButton color='inherit' aria-label={color} onClick={toggleChangePaletteMode}>
      <InvertColorsIcon />
    </IconButton>
  )
}

export default PaletteModeButton
