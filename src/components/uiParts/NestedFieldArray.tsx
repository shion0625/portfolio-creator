import React from 'react'
import { useFieldArray, UseFormRegister, Control } from "react-hook-form"
import {Box,TextField,IconButton} from '@mui/material'
import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon} from '@mui/icons-material'

type Props = {
  register: UseFormRegister<any>
  control: Control<any>
  nestIndex: number
  choiceItem: string
  label: string
  type?: React.HTMLInputTypeAttribute | 'text'
  placeholder?: string
}

const NestedFieldArray: React.FC<Props> = ({ nestIndex, control, register, choiceItem, label, type, placeholder }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `works[${nestIndex}].${choiceItem}`
  })
  const addChoiceItem = () => {
    append('')
  }
  const removeChoiceItem = (index: number) => {
    remove(index)
  }

  return (
    <Box>
      {fields.map((field, index) => {
        return (
          <Box key={field.id}>
            <TextField
              type={type}
              sx={{ width: 4 / 5, mb: 2}}
              size='small'
              label={label}
              placeholder={placeholder}
              {...register(`works[${nestIndex}].${choiceItem}[${index}]`)}
            />
            <IconButton aria-label='delete' onClick={() => removeChoiceItem(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          )
      })}
      <IconButton aria-label='add' onClick={addChoiceItem}>
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default NestedFieldArray
