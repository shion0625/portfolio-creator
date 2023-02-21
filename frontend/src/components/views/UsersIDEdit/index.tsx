import { resultCreateWork, resultUpdateWork, resultDeleteWork, useForceUpdate } from './hooks'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import lo from 'lodash'
import { Session } from 'next-auth'
import React, { useRef } from 'react'
import PrimarySearchAppBar from '~/components/templates/NavBar'
import { WorkForms } from '~/components/templates/WorkForms'
import { useGetUserWork } from '~/hooks/User/query'
import { useCreateWork, useUpdateWork, useDeleteWorks } from '~/hooks/Work/mutation'
import { WorkFormI, WorkFormInterface, DirtyWork } from '~/models/WorkForm'

type UserIDEditViewProps = {
  id: string
  session: Session
}

const UserIDEditView: React.FC<UserIDEditViewProps> = ({ id, session }) => {
  const removeWorkIds = useRef<string[]>([''])
  //データの取得
  const { userData, onUpdate } = useGetUserWork(id)
  // データの更新
  const [createWork, createLoading, createError] = useCreateWork(id)
  const [updateWork, updateLoading, updateError] = useUpdateWork()
  const [deleteWorks, deleteLoading, deleteError] = useDeleteWorks()

  const OnSubmit = async (input: WorkFormInterface, dirtyWorks?: DirtyWork[]) => {
    let chunkedIndex = 0
    for (const chunked of lo.chunk(input.works, 3)) {
      await Promise.all(
        chunked.map((work: WorkFormI, index: number) => {
          //新規作成
          if (!work.id) {
            resultCreateWork(session, work, createWork)
          }
          //更新
          if (work.id && dirtyWorks && dirtyWorks[chunkedIndex + index]) {
            resultUpdateWork(session, work, updateWork)
          }
        }),
      )
    }

    //初期状態で空の文字列が配列に入っているので1より大きかったらremoveメソッドを呼び出す。
    if (removeWorkIds.current.length > 1) {
      resultDeleteWork(session, removeWorkIds.current, deleteWorks)
    }
    onUpdate()
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>
          {userData ? (
            <WorkForms onSubmit={OnSubmit} userAuth={userData} removeWorkIds={removeWorkIds.current} />
          ) : (
            <CircularProgress color='inherit' />
          )}
        </>
      </Box>
    </>
  )
}

export default UserIDEditView
