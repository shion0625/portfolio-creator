import React from 'react'
import { useFieldArray, UseFormRegister, Control } from "react-hook-form"
import {
  Box,
  TextField,
  IconButton,
} from '@mui/material'

import {
  Add as AddIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

type Props = {
  register: UseFormRegister<any>
  control: Control<any>
  nestIndex: number
}

const LanguageFieldArray: React.FC<Props> = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `works[${nestIndex}].language`
  })
  const addLanguage = () => {
    append('')
  }
  const removeLanguage = (index: number) => {
    remove(index)
  }

  return (
    <Box>
      {fields.map((field, index) => {
        return (
          <Box key={field.id}>
            <TextField
              sx={{ mr: 2, flex: 1 }}
              size='small'
              label='開発言語'
              {...register(`works[${nestIndex}].language[${index}]`)}
            />
            <IconButton aria-label='delete' onClick={() => removeLanguage(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          )
      })}
      <IconButton aria-label='add' onClick={addLanguage}>
          <AddIcon />
        </IconButton>
    </Box>
  )
}

export default LanguageFieldArray
