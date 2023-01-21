import Box from '@mui/material/Box'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import PrimarySearchAppBar from '~/components/NavBar'
import { WorkForms } from '~/components/WorkForms'
import { WorkFormI, WorkFormInterface, DirtyWork } from '~/models/WorkForm'
import { GetUserServer, GetUserIdsServer } from '~/repositories/user'
import { CreateWork, UpdateWork, DeleteWorks } from '~/repositories/work'
import { UpdateWorkService, CreateWorkService, DeleteWorksService } from '~/services/work'
import { CircularProgress } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GetUserAuthQuery, GetUserAuthDocument } from '~/models/client'


const MyPageEdit: NextPage = () => {
  // パスパラメータから値を取得
  const router = useRouter()
  const { id } = router.query

  const [count, setCount] = useState(0);

  const { data: session, status } = useSession()
  const removeWorkIds = useRef<string[]>([''])
  //データの取得
  const { data, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
  })
  // データの更新
  const createWork = CreateWork(id)
  const updateWork = UpdateWork()
  const deleteWorks = DeleteWorks()

  const OnSubmit = (input: WorkFormInterface, dirtyWorks?: DirtyWork[]): void => {
    console.log('dirtyworks')
    console.log(dirtyWorks)
    if (!session) {
      return
    }
    input.works?.map((work: WorkFormI, index: number) => {
      //新規作成
      if (!work.id) {
        console.log('create' + index)
        CreateWorkService(session, work, createWork)
      }

      if (work.id && dirtyWorks) {
        if (dirtyWorks[index]) {
          console.log('update' + index)
          UpdateWorkService(session, work, updateWork)
        }

      }
    })
    //初期状態で空の文字列が配列に入っているので1より大きかったらremoveメソッドを呼び出す。
    if (removeWorkIds.current.length > 1) {
      console.log('delete')
      console.log(removeWorkIds.current)
      DeleteWorksService(session, removeWorkIds.current, deleteWorks)
    }
    setCount(count + 1)
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>
          {data?.userAuth ? (
            <WorkForms
              onSubmit={OnSubmit}
              user={data?.userAuth}
              removeWorkIds={removeWorkIds.current}
            />
          ) : (
            <CircularProgress color='inherit' />
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
    notFound: !user,
  }
}
