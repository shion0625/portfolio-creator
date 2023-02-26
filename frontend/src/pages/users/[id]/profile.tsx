import { CircularProgress } from '@mui/material'
// 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import UsersIDView from '~/components/views/UsersID'
import { GetUserQuery } from '~/models/client'
import { userRepository } from '~/repositories/index'

const UserDetail: NextPage<GetUserQuery> = ({ user }) => {
  const { data: session, status } = useSession()
  //ユーザが見つかっていない
  if (!user) {
    return <CircularProgress color='inherit' />
  }
  // sessionが存在していない
  if (!session) {
    return <CircularProgress color='inherit' />
  }

  return <UsersIDView user={user} session={session} />
}
export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await userRepository.getUserIds(10, 0)
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
  const { user } = await userRepository.getUser(params.id)
  return {
    props: {
      user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
