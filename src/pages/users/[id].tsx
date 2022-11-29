import Link from 'next/link' // 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { assertIsDefined } from '../../lib/assert'
import { CircularProgress } from '@mui/material'
import { User } from '../../graphql/types'
import { getSdk } from '../../graphql/ssr.generated'
import { GraphQLClient } from 'graphql-request'

type Props = {
  user: User
}

const UserDetail: NextPage<Props> = ({ user }) => {
  if (!user) {
    return <CircularProgress color='inherit' />
  }
  return (
    <div>
      <p>User Detail</p>
      <p>{`ID: ${user.id}`}</p>
      <p>{user.name}</p>
      <Link href='/users'>
        <a>Back to users</a>
      </Link>
    </div>
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
