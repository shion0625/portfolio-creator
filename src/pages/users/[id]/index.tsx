import { CircularProgress } from '@mui/material'
import { Box } from '@mui/material'
import { GraphQLClient } from 'graphql-request'
// 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import PrimarySearchAppBar from '~/components/NavBar'
import { assertIsDefined } from '~/utils/assert'
import { getSdk } from '~/models/ssr.generated'
import { User } from '~/models/types'

type Props = {
  user: User
}

const UserDetail: NextPage<Props> = ({ user }) => {
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const { users } = await sdk.GetUserIds({ limit: 10, offset: 0 })

  const paths = users.nodes.map((user: User) => ({
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)

  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const { user } = await sdk.GetUser({ id: params?.id })

  return {
    props: {
      user: user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
