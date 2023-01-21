import { Add as AddIcon } from '@mui/icons-material'
// 利用したい MUI コンポーネントを import
import { Box, Button, Container, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
// 利用したい React Hook Form のフックをimport
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import ImageCard from '~/components/uiParts/ImageCard'
import { WorkFormContext } from '~/context/workForm'
import { WorkFormInterface, addNewWork, resetNewWorks, DirtyWork } from '~/models/WorkForm'
import { GetUserQuery } from '~/models/client'

type Props = GetUserQuery & {
  onSubmit: (data: WorkFormInterface, dirtyWorks?: DirtyWork[]) => void
  removeWorkIds: string[]
}

export const WorkForms: React.FC<Props> = ({ onSubmit, user, removeWorkIds }): JSX.Element => {
  //userオブジェクトのデータの複製
  const userCopy = Object.assign({}, JSON.parse(JSON.stringify(user)))
  userCopy.works?.nodes.forEach((workItem: any) => {
    workItem.languages = JSON.parse(workItem?.language)
    workItem.urls = JSON.parse(workItem?.url)
  })

  const {
    // register 関数はinput/select の Ref とバリデーションルールを React Hook Form に登録 (register)
    register,

    // reset 関数はフォーム内のフィールドの値とエラーをリセットできる
    reset,
    control,
    getValues,

    // handleSubmit 関数はバリデーションに成功するとフォームデータを渡す
    handleSubmit,

    // errors オブジェクトには、各 input のフォームのエラーまたはエラーメッセージが含まれる
    // バリデーションとエラーメッセージで登録するとエラーメッセージが返される
    formState: { touchedFields, errors },
  } = useForm<WorkFormInterface>({
    defaultValues: {
      works: userCopy.works?.nodes,
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

  const removeWork = (index: number, workId: string) => {
    removeWorkIds.push(workId)
    remove(index)
  }

  const submitWork: SubmitHandler<WorkFormInterface> = (data: WorkFormInterface) => {
    onSubmit(data, touchedFields.works)
    // touched状態とdirty状態のリセット
    // 値,エラーは保持したまま
    reset({}, {
      keepErrors: true,
      keepDirty: false,
      keepValues: true,
      keepTouched: false,
    }
    )
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 5, bgcolor: 'yellow' }}>
    <Stack component="form" noValidate
        onSubmit={handleSubmit(submitWork)}
      >
      <Grid container spacing={2}>
        {fields.map((field, workIndex) => {
          return (
            <WorkFormContext.Provider value={{ workIndex, register, control, errors }} key={field.id}>
              <Grid item xs={6} md={4} lg={3}>
                <ImageCard workIndex={workIndex} removeWork={removeWork} getValues={getValues} control={control} />
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
          全削除
        </Button>
        <Button
          color='primary'
          variant='contained'
          disableElevation
          type="submit"
        >
          送信
        </Button>
        </Box>
      </Stack>
    </Container>
  )
}
