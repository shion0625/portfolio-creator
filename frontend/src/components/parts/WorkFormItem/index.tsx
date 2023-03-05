// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { Item } from './style'
import { ErrorMessage } from '@hookform/error-message'
import { Box, TextField } from '@mui/material'
import React, { useContext } from 'react'
import NestedFieldArray from '~/components/templates/NestedFieldList'
import { WorkFormContext } from '~/stores/workForm'

const WorkFormItem: React.FC = () => {
  const { register, control, workIndex, errors } = useContext(WorkFormContext)
  return (
    <Item>
      <input type='hidden' disabled {...register(`works.${workIndex}.id` as const)} />
      <input type='hidden' disabled {...register(`works.${workIndex}.user_id` as const)} />
      <TextField
        fullWidth
        size='small'
        label='タイトル'
        {...register(`works.${workIndex}.title` as const, {
          required: true,
        })}
      />
      <Box color='error.main' fontSize={12} sx={{ mb: 2 }}>
        <ErrorMessage errors={errors} name={`works.${workIndex}.title`} as='p' message='⚠ タイトルを入力してください' />
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
        label='開発言語・技術'
        targetName={`works[${workIndex}].languages`}
      />

      <TextField sx={{ mb: 2 }} fullWidth size='small' label='役割' {...register(`works.${workIndex}.role` as const)} />

      <NestedFieldArray
        register={register}
        control={control}
        label='URL'
        type='url'
        placeholder='https://example.com'
        targetName={`works[${workIndex}].urls`}
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

      <TextField fullWidth size='small' label='画像' {...register(`works.${workIndex}.image_url` as const)} />
    </Item>
  )
}

export default WorkFormItem
