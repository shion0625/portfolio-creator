import React from 'react'

// 利用したい MUI コンポーネントを import
import {Box, Button, Container, Stack} from '@mui/material'

// 利用したい React Hook Form のフックをimport
import { useForm, useFieldArray } from 'react-hook-form'
import { Add as AddIcon} from '@mui/icons-material'
import { CreateWorkInput } from '../graphql/types'
import WorkFormItem from './uiParts/WorkFormItem'
// 計算結果を表示させる TotalAmount コンポーネントをimport
export type WorkForm = {
  works: CreateWorkInput[]
}

const newWork = {
  title: '',
  url: '',
  summary: '',
  duration: '',
  number_of_people: 0,
  language: '',
  role: '',
  brief_story: '',
  image_url: '',
  user_id: ''
}
const newWorks = {
  works: [
    {
      title: '',
      url: '',
      summary: '',
      duration: '',
      number_of_people: 0,
      language: '',
      role: '',
      brief_story: '',
      image_url: '',
      user_id: ''
    },
  ],
}

export const WorkForms = (): JSX.Element => {
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
          title: 'kaito',
          url: 'tko',
          summary: 'ko',
          duration: 'wgaea',
          number_of_people: 1,
          language: 'awea',
          role: 'gawea',
          brief_story: 'wagea',
          image_url: 'bawea',
        }
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
    append(newWork)
  }

  const resetWorks = () => {
    reset(newWorks)
  }
  const removeWork = (index: number) => {
    remove(index)
  }

  const onSubmit = (data: WorkForm) => console.log(data)

  return (
    <Container maxWidth='sm' sx={{ pt: 5, bgcolor: '#fff' }}>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          return (
            <WorkFormItem
              key={field.id}
              register={register}
              removeWork={removeWork}
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
        <Button
          variant='outlined'
          sx={{ mr: 1 }}
          onClick={resetWorks}
        >
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
