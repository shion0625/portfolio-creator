import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material'
import { Box, TextField, IconButton } from '@mui/material'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type ChoiceInputProps = {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  onAction: () => void
  type?: React.HTMLInputTypeAttribute | 'text'
}

const ChoiceInput: React.FC<ChoiceInputProps> = ({ name, label, placeholder, register, onAction, type }) => {
  return (
    <Box>
      <TextField
        type={type}
        sx={{ width: 4 / 5, mb: 2 }}
        size='small'
        label={label}
        placeholder={placeholder}
        {...register(name)}
      />
      <IconButton aria-label='delete' onClick={onAction}>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  )
}

export default ChoiceInput
