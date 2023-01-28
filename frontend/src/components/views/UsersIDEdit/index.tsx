import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import PrimarySearchAppBar from '~/components/templates/NavBar'
import { WorkForms } from '~/components/templates/WorkForms'
import { WorkFormI, WorkFormInterface, DirtyWork } from '~/models/WorkForm'
import { useCreateWork, useUpdateWork, useDeleteWorks } from '~/hooks/Work/mutation'
import { resultCreateWork, resultUpdateWork, resultDeleteWork } from './hook'
import { GetUserAuth } from '~/hooks/User/query'
import lo from 'lodash';

const UserIDEditView: React.FC = () => {
  // パスパラメータから値を取得
  const router = useRouter()
  const { id } = router.query
  if (!id || Array.isArray(id)) return (<div>error</div>)

  const [count, setCount] = useState(0)

  const { data: session, status } = useSession()
  const removeWorkIds = useRef<string[]>([''])
  //データの取得
  const userData = GetUserAuth(id)
  // データの更新
  const [createWork, createLoading, createError] = useCreateWork(id)
  const [updateWork, updateLoading, updateError] = useUpdateWork()
  const [deleteWorks, deleteLoading, deleteError] = useDeleteWorks()

  const OnSubmit = async (input: WorkFormInterface, dirtyWorks?: DirtyWork[]) => {
    //ログインしているユーザとパスのユーザが同じかどうか
    if (!session || !session.user || session.user.id != id) {
      return
    }
    let chunkedIndex = 0;
    for (const chunked of lo.chunk(input.works, 3)) {
      await Promise.all(chunked.map((work: WorkFormI, index: number) => {
      //新規作成
        if (!work.id) {
          resultCreateWork(session, work, createWork)
        }
        //更新
        if (work.id && dirtyWorks && dirtyWorks[chunkedIndex + index]) {
            resultUpdateWork(session, work, updateWork)
        }
      }))
    }

    //初期状態で空の文字列が配列に入っているので1より大きかったらremoveメソッドを呼び出す。
    if (removeWorkIds.current.length > 1) {
      resultDeleteWork(session, removeWorkIds.current, deleteWorks)
    }
    setCount(count + 1)
  }

  if (userData === 'error') return (<div>error</div>)
  if (userData === 'dataNotFound') return (<div>dataNotFound</div>)
  if (userData === 'loading') return (<div>loading</div>)

  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>
          {userData ? (
            <WorkForms onSubmit={OnSubmit} userAuth={userData.userAuth} removeWorkIds={removeWorkIds.current} />
          ) : (
            <CircularProgress color='inherit' />
          )}
        </>
      </Box>
    </>
  )
}

export default UserIDEditView
