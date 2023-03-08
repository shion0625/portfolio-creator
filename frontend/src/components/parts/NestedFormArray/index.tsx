import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material'
import { Box, TextField, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { useFieldArray, UseFormRegister, Control } from 'react-hook-form'

type Props = {
  targetName: string
  register: UseFormRegister<any>
  control: Control<any>
  label: string
  type?: React.HTMLInputTypeAttribute | 'text'
  placeholder?: string
}

const NestedFormArray: React.FC<Props> = ({ control, register, targetName, label, type, placeholder }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: targetName,
  })

  const addChoiceItem = useCallback(() => {
    append('')
  }, [append])

  const removeChoiceItem = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove],
  )

  return (
    <Box>
      {fields.map((field, index) => {
        return (
          <Box key={field.id}>
            <TextField
              type={type}
              sx={{ width: 4 / 5, mb: 2 }}
              size='small'
              label={label}
              placeholder={placeholder}
              {...register(`${targetName}[${index}]`)}
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

export default NestedFormArray
