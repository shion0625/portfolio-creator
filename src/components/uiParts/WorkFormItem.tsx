import React from "react";
import { Control, useFieldArray, UseFormRegister, useWatch } from "react-hook-form";
import { WorkForm } from "../WorkForms";
import {
  Box,
  TextField,
  IconButton,
} from '@mui/material'

import {
  Add as AddIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'

// React Hook Form でエラーメッセージを表示するための ErrorMessage コンポーネントを import
import { ErrorMessage } from '@hookform/error-message'

type Props = {
  register: UseFormRegister<WorkForm>
  workIndex: number
  removeWork: (index: number) => void
  errors: any
}

const WorkFormItem: React.FC<Props> = ({ register, removeWork, workIndex, errors}) => {
  return (
    <>
      <input
        type="hidden"
        disabled
        {...register(`works.${workIndex}.user_id`)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='タイトル'
        {...register(`works.${workIndex}.title`, {
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
        {...register(`works.${workIndex}.duration`)}
      />

      <TextField
        sx={{ mr: 1, flex: 1 }}
        size='small'
        type='number'
        label='開発人数'
        {...register(`works.${workIndex}.number_of_people`, {
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
        <TextField
          sx={{ mr: 2, flex: 3 }}
          size='small'
          label='開発言語'
          {...register(`works.${workIndex}.language`)}
        />
        {/* <IconButton aria-label='add' onClick={addWork}>
          <AddIcon />
        </IconButton> */}
      </Box>

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='役割'
        {...register(`works.${workIndex}.role`)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='URL'
        {...register(`works.${workIndex}.url`, {
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
        {...register(`works.${workIndex}.brief_story`)}
      />

      <TextField
        sx={{ mr: 2, flex: 3 }}
        size='small'
        label='画像'
        {...register(`works.${workIndex}.image_url`)}
      />

      {/* remove 関数は特定の位置の input を削除、位置を指定しない場合は全てを削除 */}
      <IconButton aria-label='delete' onClick={() => removeWork(workIndex)}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
  )
}

export default WorkFormItem
