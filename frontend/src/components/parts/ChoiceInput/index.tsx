import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material'
import { Box, TextField, IconButton } from '@mui/material'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

export type Props = {
  name: string // input要素のname属性に使用される値
  label: string // input要素のラベルとして使用される文字列
  placeholder?: string // input要素のプレースホルダーとして使用される文字列
  register: UseFormRegister<any> // react-hook-formで提供されるregister関数
  onAction: () => void // 削除ボタンがクリックされた時に呼び出される関数
  type?: React.HTMLInputTypeAttribute // input要素のタイプ属性
}

const ChoiceInput: React.FC<Props> = ({ name, label, placeholder, register, onAction, type = 'text' }) => {
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
