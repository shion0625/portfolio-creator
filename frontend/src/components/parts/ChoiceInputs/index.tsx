import { Add as AddIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { useFieldArray, UseFormRegister, Control } from 'react-hook-form'
import ChoiceInput from '~/components/parts/ChoiceInput'

type ChoiceInputsProps = {
  targetName: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  control: Control<any>
  type?: React.HTMLInputTypeAttribute | 'text'
}

const ChoiceInputs: React.FC<ChoiceInputsProps> = ({ targetName, label, placeholder, register, control, type }) => {
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
          <ChoiceInput
            key={field.id}
            name={`${targetName}[${index}]`}
            label={label}
            placeholder={placeholder}
            register={register}
            onAction={() => removeChoiceItem(index)}
            type={type}
          />
        )
      })}
      <IconButton aria-label='add' onClick={addChoiceItem}>
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ChoiceInputs
