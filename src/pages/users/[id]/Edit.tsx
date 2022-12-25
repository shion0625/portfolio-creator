import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import Box from '@mui/material/Box'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import PrimarySearchAppBar from '~/components/NavBar'
import { WorkForms } from '~/components/WorkForms'
import { WorkFormInterface } from '~/models/WorkForm'
import { CreateWorkMutation, UpdateWorkMutation, CreateWorkDocument, UpdateWorkDocument } from '~/models/client'
import { GetUserQuery } from '~/models/client'
import { GetUserDocument } from '~/models/client'
import { GetUser, GetUserIds } from '~/repositories/user'
import { UpdateWorkService, CreateWorkService } from '~/services/work'

const MyPageEdit: NextPage<GetUserQuery> = () => {
  const router = useRouter()
  // パスパラメータから値を取得
  const { id } = router.query

  const { data } = useQuery<GetUserQuery>(GetUserDocument, {
    fetchPolicy: 'cache-and-network', //build時に確認
    variables: { id: id },
  })

  const { data: session, status } = useSession()

  const [CreateWork] = useMutation<CreateWorkMutation>(CreateWorkDocument, {
    // ミューテーション後に実行される処理
    update(cache, { data }) {
      const newWork = data?.createWork // ミューテーションのレスポンス
      const existingUser = cache.readQuery<GetUserQuery>({
        query: GetUserDocument,
        variables: { id: id },
      })
      if (newWork) {
        let existingUserCopy = Object.assign({}, JSON.parse(JSON.stringify(existingUser)))
        existingUserCopy?.user?.works?.nodes.push(newWork)
        // FETCH_ALL_TASKSのキャッシュに新規タスクを追加
        cache.writeQuery({
          query: GetUserDocument,
          data: existingUserCopy,
        })
      }
    },
  })

  const [UpdateWork] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)

  const OnSubmit = (input: WorkFormInterface) => {
    input.works?.map((work) => {
      //データの更新
      if (work.id) {
        UpdateWorkService(session, work, UpdateWork)
      }
      //新規作成
      if (!work.id) {
        CreateWorkService(session, work, CreateWork)
      }
    })
    // router.reload()
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <>{data ? <WorkForms onSubmit={OnSubmit} user={data.user} /> : <p>ロード中です。</p>}</>
      </Box>
    </>
  )
}

export default MyPageEdit

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await GetUserIds(10, 0)
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
  const { user } = await GetUser(params?.id)
  return {
    props: {
      user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
