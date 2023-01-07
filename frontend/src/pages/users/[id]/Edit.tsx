import Box from '@mui/material/Box'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import PrimarySearchAppBar from '~/components/NavBar'
import { WorkForms } from '~/components/WorkForms'
import { WorkFormI, WorkFormInterface, DirtyWork } from '~/models/WorkForm'
import { GetUserQuery } from '~/models/client'
import { GetUser, GetUserServer, GetUserIdsServer } from '~/repositories/user'
import { CreateWork, UpdateWork, DeleteWorks } from '~/repositories/work'
import { UpdateWorkService, CreateWorkService, DeleteWorksService } from '~/services/work'

const MyPageEdit: NextPage = () => {
  // パスパラメータから値を取得
  const router = useRouter()
  const { id } = router.query

  const { data: session, status } = useSession()
  const dirtyWorks = useRef<DirtyWork[]>()
  const removeWorkIds = useRef<string[]>([''])
  const user = GetUser(id)
  const createWork = CreateWork(id)
  const updateWork = UpdateWork()
  const deleteWorks = DeleteWorks()

  const OnSubmit = (input: WorkFormInterface) => {
    if (!session) {
      return
    }
    input.works?.map((work: WorkFormI, index: number) => {
      //新規作成
      if (!work.id) {
        CreateWorkService(session, work, createWork)
      }
      //データの更新
      if (work.id && dirtyWorks && dirtyWorks.current && dirtyWorks.current[index]) {
        UpdateWorkService(session, work, updateWork)
      }
    })
    //初期状態で空の文字列が配列に入っているので1より大きかったらremoveメソッドを呼び出す。
    if (removeWorkIds.current.length > 1) {
      DeleteWorksService(session, removeWorkIds.current, deleteWorks)
    }
    router.reload()
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>
          {user ? (
            <WorkForms
              onSubmit={OnSubmit}
              user={user}
              dirtyWorks={dirtyWorks.current}
              removeWorkIds={removeWorkIds.current}
            />
          ) : (
            <p>ロード中です。</p>
          )}
        </>
      </Box>
    </>
  )
}

export default MyPageEdit

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await GetUserIdsServer(10, 0)
  const paths = users.nodes.map((user: { id: string }) => ({
    params: {
      id: user.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return {
      props: {
        user: 'error',
      },
    }
  }
  //配列として扱われたら連結をする
  if (Array.isArray(params.id)) {
    params.id = params.id.join()
  }

  const { user } = await GetUserServer(params?.id)
  return {
    props: {
      user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
