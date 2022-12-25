import { CircularProgress } from '@mui/material'
import { Box } from '@mui/material'
// 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import PrimarySearchAppBar from '~/components/NavBar'
import { GetUserQuery } from '~/models/client'
import { GetUser, GetUserIds } from '~/repositories/user'

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
