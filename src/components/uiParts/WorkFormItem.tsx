import React, { useContext } from 'react'
import { Box, TextField, IconButton, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { ErrorMessage } from '@hookform/error-message'
import NestedFieldArray from './NestedFieldArray'
import { WorkFormContext } from '../WorkForms'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: 500,
  height: 500,
  overflowY: 'auto',
}))

const WorkFormItem: React.FC = () => {
  const { register, control, workIndex, errors } =
    useContext(WorkFormContext)
  return (
    <Item>
      <input
        type='hidden'
        disabled
        {...register(`works.${workIndex}.id` as const)}
      />
      <input
        type='hidden'
        disabled
        {...register(`works.${workIndex}.user_id` as const)}
      />
      <TextField
        fullWidth
        size='small'
        label='タイトル'
        {...register(`works.${workIndex}.title` as const, {
          required: true,
        })}
      />
      <Box color='error.main' fontSize={12} sx={{ mb: 2 }}>
        <ErrorMessage
          errors={errors}
          name={`works.${workIndex}.title`}
          as='p'
          message='⚠ タイトルを入力してください'
        />
      </Box>

      <TextField
        sx={{ mb: 2 }}
        multiline
        rows={2}
        fullWidth
        size='small'
        label='概要'
        {...register(`works.${workIndex}.summary` as const)}
      />

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        size='small'
        label='開発期間'
        {...register(`works.${workIndex}.duration` as const)}
      />

      <TextField
        fullWidth
        size='small'
        type='number'
        label='開発人数'
        {...register(`works.${workIndex}.number_of_people` as const, {
          // input が受け付ける最小文字数と最大文字数を設定
          min: 1,
          max: 100,
        })}
      />
      <Box color='error.main' fontSize={12} sx={{ mb: 2 }}>
        <ErrorMessage
          errors={errors}
          name={`works.${workIndex}.number_of_people`}
          as='p'
          message='⚠ 数量欄に1~100の数字を入力してください'
        />
      </Box>

      <NestedFieldArray
        register={register}
        control={control}
        nestIndex={workIndex}
        label='開発言語・技術'
        choiceItem='languages'
      />

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        size='small'
        label='役割'
        {...register(`works.${workIndex}.role` as const)}
      />

      <NestedFieldArray
        register={register}
        control={control}
        nestIndex={workIndex}
        label='URL'
        type='url'
        placeholder='https://example.com'
        choiceItem='urls'
      />

      <TextField
        sx={{ mb: 2 }}
        multiline
        rows={2}
        fullWidth
        size='small'
        label='小話'
        {...register(`works.${workIndex}.brief_story` as const)}
      />

      <TextField
        fullWidth
        size='small'
        label='画像'
        {...register(`works.${workIndex}.image_url` as const)}
      />
    </Item>
  )
}

export default WorkFormItem
