import Link from 'next/link' // 一覧ページへリンクするので
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { initializeApollo } from '../../lib/apolloClient'
import { GetUserIdsDocument, GetUserDocument } from "../../../graphql/dist/client";
import { GetUserQuery, GetUserIdsQuery, User } from "../../../graphql/dist/client";
import { CircularProgress } from '@mui/material';

type Props = {
  user: User
}
type Paths = {
  params: {
    id: string;
  }
}

const UserDetail: NextPage<Props> = ({user}) => {
  if (!user) {
    return <CircularProgress color="inherit" />
  }
  return (
    <div>
      <p>User Detail</p>
      <p>{`ID: ${user.id}` }</p>
      {/* <p>{user.name}</p> */}
      <Link href="/">
        <span>Back to main</span>
      </Link>
    </div>
  )
}
export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GetUserIdsDocument,
    variables: { limit: 100, offset: 0 },
  })
  const paths = data.users.nodes.map((user) => ({
    params: {
      id: user.id
    },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserQuery>({
    query: GetUserDocument,
    variables: {id: params?.id},
  })
  return {
    props: {
      user: data.user
    },
    revalidate: 1,
    notFound: !data
  }
}
