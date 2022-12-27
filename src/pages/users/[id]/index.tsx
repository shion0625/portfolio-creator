import { CircularProgress } from '@mui/material'
import { Box } from '@mui/material'
// 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import PrimarySearchAppBar from '~/components/NavBar'
import { GetUserQuery } from '~/models/client'
import { GetUserServer, GetUserIdsServer } from '~/repositories/user'

const UserDetail: NextPage<GetUserQuery> = ({ user }) => {
  if (!user) {
    return <CircularProgress color='inherit' />
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>User Detail</p>
        <p>{`ID: ${user.id}`}</p>
        <p>{user.name}</p>
        <Link href='/users'>
          <a>Back to users</a>
        </Link>
      </Box>
    </>
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
