import React from "react";
import { Control, useFieldArray, UseFormRegister, useWatch } from "react-hook-form";
import { WorkForm } from "../WorkForms";
import {
  Box,
  TextField,
  IconButton,
} from '@mui/material'

import {
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { ErrorMessage } from '@hookform/error-message'
import LanguageFieldArray from './LanguageFieldArray'

type Props = {
  register: UseFormRegister<WorkForm>
  control: Control<WorkForm>
  removeWork: (index: number) => void
  workIndex: number
  errors: any
}

const WorkFormItem: React.FC<Props> = ({ register, removeWork, control, workIndex, errors }) => {

  return (
    <>
      <input
        type="hidden"
        disabled
        {...register(`works.${workIndex}.user_id` as const)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='タイトル'
        {...register(`works.${workIndex}.title` as const, {
          required: true,
        })}
      />
      <Box color='error.main' fontSize={12}>
        <ErrorMessage
          errors={errors}
          name={`works.${workIndex}.title`}
          as='p'
          message='⚠ タイトルを入力してください'
        />
      </Box>

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='開発期間'
        {...register(`works.${workIndex}.duration` as const)}
      />

      <TextField
        sx={{ mr: 1, flex: 1 }}
        size='small'
        type='number'
        label='開発人数'
        {...register(`works.${workIndex}.number_of_people` as const, {
          // input が受け付ける最小文字数と最大文字数を設定
          min: 1,
          max: 100,
        })}
      />
      <Box color='error.main' fontSize={12}>
        <ErrorMessage
          errors={errors}
          name={`works.${workIndex}.image_url`}
          as='p'
          message='⚠ 数量欄に1~100の数字を入力してください'
        />
      </Box>
      <Box>
        <LanguageFieldArray register={register} control={control} nestIndex={ workIndex } />
      </Box>

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='役割'
        {...register(`works.${workIndex}.role` as const)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='URL'
        {...register(`works.${workIndex}.url` as const, {
          required: true,
        })}
      />
      <Box color='error.main' fontSize={12}>
        <ErrorMessage
          errors={errors}
          name={`works.${workIndex}.image_url`}
          as='p'
          message='⚠ URLを入力してください'
        />
      </Box>
      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='小話'
        {...register(`works.${workIndex}.brief_story` as const)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='画像'
        {...register(`works.${workIndex}.image_url` as const)}
      />

      {/* remove 関数は特定の位置の input を削除、位置を指定しない場合は全てを削除 */}
      <IconButton aria-label='delete' onClick={() => removeWork(workIndex)}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
  )
}

export default WorkFormItem
