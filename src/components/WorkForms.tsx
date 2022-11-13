import React from 'react'
// 利用したい MUI コンポーネントを import
import { Box, Button, Container, Stack } from '@mui/material'
// 利用したい React Hook Form のフックをimport
import { useForm, useFieldArray } from 'react-hook-form'
import { Add as AddIcon } from '@mui/icons-material'
import WorkFormItem from './uiParts/WorkFormItem'
import { WorkForm, addNewWork, resetNewWorks } from '../interfaces/WorkForm'

type Props = {
  onSubmit: (data: WorkForm)=> void
}

export const WorkForms: React.FC<Props> = ({ onSubmit }): JSX.Element => {
  const {
    // register 関数はinput/select の Ref とバリデーションルールを React Hook Form に登録 (register)
    register,

    // reset 関数はフォーム内のフィールドの値とエラーをリセットできる
    reset,
    control,

    // handleSubmit 関数はバリデーションに成功するとフォームデータを渡す
    handleSubmit,

    // errors オブジェクトには、各 input のフォームのエラーまたはエラーメッセージが含まれる
    // バリデーションとエラーメッセージで登録するとエラーメッセージが返される
    formState: { errors },
  } = useForm<WorkForm>({
    defaultValues: {
      works: [
        {
          id:'LLL',
          title: 'kaito',
          url: ['ff','ff'],
          summary: 'ko',
          duration: 'wgaea',
          number_of_people: 1,
          language: ['awea', 'ffa'],
          role: 'gawea',
          brief_story: 'wagea',
          image_url: 'bawea',
          user_id: 'awea',
        },
      ],
    },

    // blur イベントからバリデーションがトリガーされる
    mode: 'onBlur',
  })

  // useFieldArray に name と control を渡すことで、MUI の TextField への入力値を取得できるようになる
  const { fields, append, remove } = useFieldArray({
    name: 'works',
    control,
  })

  const addWork = () => {
    append(addNewWork)
  }

  const resetWorks = () => {
    reset(resetNewWorks)
  }
  const removeWork = (index: number) => {
    remove(index)
  }

  return (
    <Container maxWidth='sm' sx={{ pt: 5, bgcolor: 'yellow' }}>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <WorkFormItem
              key={field.id}
              register={register}
              removeWork={removeWork}
              control={control}
              workIndex={index}
              errors={errors}
            />
          )
        })}
      </Stack>
      <Button
        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        // append 関数はフィールドの最後に input を追加する
        onClick={addWork}
      >
        行を追加する
      </Button>
      <Box textAlign='center' mt={2}>
        <Button variant='outlined' sx={{ mr: 1 }} onClick={resetWorks}>
          リセット
        </Button>
        <Button
          color='primary'
          variant='contained'
          disableElevation
          // submit イベントからバリデーションがトリガーされる
          onClick={handleSubmit(onSubmit)}
        >
          送信
        </Button>
      </Box>
    </Container>
  )
}
