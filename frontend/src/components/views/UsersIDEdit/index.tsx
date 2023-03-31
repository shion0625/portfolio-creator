import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import lo from 'lodash'
import { Session } from 'next-auth'
import React, { useRef } from 'react'
import PrimarySearchAppBar from '~/components/screens/NavBar'
import { WorkForms } from '~/components/templates/WorkForms'
import { useCreateWork, useGetUserWork, useUpdateWork, useDeleteWorks } from '~/components/views/UsersIDEdit/hooks'
import { WorkFormData, WorkFormInput, DirtyWork } from '~/models/Work'

type UserIDEditViewProps = {
  id: string
  session: Session
}

const UserIDEditView: React.FC<UserIDEditViewProps> = ({ id, session }) => {
  const CHUNK_SIZE = 3
  const removeWorkIds = useRef<string[]>([''])
  //データの取得
  const { userData, onUpdate } = useGetUserWork(id)
  const { createWork, loading: createLoading, error: createError } = useCreateWork()
  const { updateWork, loading: updateLoading, error: updateError } = useUpdateWork()
  const { deleteWorks, loading: deleteLoading, error: deleteError } = useDeleteWorks()

  const handleSubmit = async (input: WorkFormInput, dirtyWorks?: DirtyWork[]) => {
    try {
      await Promise.all(
        lo.chunk(input.works, CHUNK_SIZE).map(async (chunked, index) => {
          await Promise.all(
            chunked.map(async (work: WorkFormData, innerIndex: number) => {
              //新規作成
              if (!work.id) {
                await createWork(session, work)
              }
              //更新
              if (work.id && dirtyWorks && dirtyWorks[index * CHUNK_SIZE + innerIndex]) {
                await updateWork(session, work)
              }
            }),
          )
        }),
      )
      //初期状態で空の文字列が配列に入っているので1より大きかったらremoveメソッドを呼び出す。
      if (removeWorkIds.current.length > 1) {
        await deleteWorks(session, removeWorkIds.current).then(() => onUpdate())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>
          {userData ? (
            <WorkForms onSubmit={handleSubmit} userAuth={userData} removeWorkIds={removeWorkIds.current} />
          ) : (
            <CircularProgress color='inherit' />
          )}
        </>
      </Box>
    </>
  )
}

export default UserIDEditView
