import { Add as AddIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { useFieldArray, UseFormRegister, Control } from 'react-hook-form'
import ChoiceInput from '~/components/parts/ChoiceInput'

// ChoiceInputコンポーネントのプロパティの型定義
type ChoiceInputsProps = {
  targetName: string // フォームの対象となるname属性の値
  label: string // ラベル表示用の文字列
  placeholder?: string // ヒント表示用の文字列
  register: UseFormRegister<any> // フォームのregister関数
  control: Control<any> // フォームのcontrolオブジェクト
  type?: React.HTMLInputTypeAttribute // 入力欄のtype属性の値
}

const ChoiceInputs: React.FC<ChoiceInputsProps> = ({
  targetName,
  label,
  placeholder,
  register,
  control,
  type = 'text',
}) => {
  // useFieldArrayフックを使用して、選択肢の配列を制御する
  const { fields, remove, append } = useFieldArray({
    control,
    name: targetName,
  })

  // 選択肢を追加するためのコールバック関数
  const addChoiceItem = useCallback(() => {
    append('')
  }, [append])

  // 選択肢を削除するためのコールバック関数
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
      {/* 選択肢を追加するためのボタン */}
      <IconButton aria-label='add' onClick={addChoiceItem}>
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ChoiceInputs
