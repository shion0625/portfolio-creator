import React from 'react'
// 利用したい MUI コンポーネントを import
import { Box, Button, Container, Stack } from '@mui/material'
// 利用したい React Hook Form のフックをimport
import { useForm, useFieldArray } from 'react-hook-form'
import { Add as AddIcon } from '@mui/icons-material'
import { WorkForm, addNewWork, resetNewWorks } from '../interfaces/WorkForm'
import ImageCard from './uiParts/ImageCard'
import { Control, UseFormRegister } from 'react-hook-form'
import Grid from '@mui/material/Grid';

import { createContext } from "react";

type Props = {
  onSubmit: (data: WorkForm)=> void
}

type TWorkFormContext = {
  register: UseFormRegister<WorkForm>
  control: Control<WorkForm>
  removeWork: (index: number) => void
  workIndex: number
  errors: any
};

export const WorkFormContext = createContext({} as TWorkFormContext)

export const WorkForms: React.FC<Props> = ({ onSubmit }): JSX.Element => {
  const {
    // register 関数はinput/select の Ref とバリデーションルールを React Hook Form に登録 (register)
    register,

    // reset 関数はフォーム内のフィールドの値とエラーをリセットできる
    reset,
    control,
    watch,

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
          user_id: 'clao23geb0000ssu3qbzn58aq',
        },
      ],
    },

    // blur イベントからバリデーションがトリガーされる
    mode: 'onBlur',
  })

  // useFieldArray に name と control を渡すことで、MUI の TextField への入力値を取得できるようになる
  const {fields, append, remove } = useFieldArray({
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
    <Container maxWidth='lg' sx={{ pt: 5,bgcolor: 'yellow' }}>
      <Grid container spacing={2}>
        {fields.map((field, workIndex) => {
          return (
            <WorkFormContext.Provider value={{ workIndex, register, control, removeWork, errors }} key={field.id}>
              <Grid item xs={3}>
                <ImageCard
                  workIndex={workIndex}
                  watch={watch}
                />
              </Grid>
            </WorkFormContext.Provider>
          )
        })}
      </Grid>
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
