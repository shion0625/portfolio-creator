import { CircularProgress } from '@mui/material'
// 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { GetUserQuery } from '~/models/client'
import { GetUserServer, GetUserIdsServer } from '~/repositories/user'
import UsersIDView from '~/components/views/UsersID'

const UserDetail: NextPage<GetUserQuery> = ({ user }) => {
  const { data: session, status } = useSession()
  if (!user) {
    return <CircularProgress color='inherit' />
  }
  return (
    <UsersIDView user={ user } session = {session} />
  )
}
export default UserDetail

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
  const { user } = await GetUserServer(params.id)
  return {
    props: {
      user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
