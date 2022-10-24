import React from 'react'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import { GraphQLClient } from 'graphql-request';
import { getSdk } from "../graphql/ssr.generated"
import { UserPagination, User } from "../graphql/types"
import { assertIsDefined } from "../lib/assert";
import { Box,Paper } from '@mui/material';

type Props = {
  users: UserPagination
}

const Users: NextPage<Props> = ({ users }) => {
  return (
    <Box>
      <p>ユーザの一覧</p>
      {users?.nodes.map((user :User) => {
        return (
          <>
            <Paper elevation={3} sx={{m: 2, py: 2, fontSize: 18}}>
              <Link key={user.id} href={`/users/${user.id}`}>
                <a>{user.name}</a>
              </Link>
            </Paper>
          </>
        )
      })}
    </Box>
  )

}

export default Users

export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  assertIsDefined(apiBaseUrl);
  const client = new GraphQLClient(apiBaseUrl)

  const sdk = getSdk(client)
  const { users } = await sdk.GetUsersName({limit: 10, offset: 0})
  return {
    props: { users: users },
    revalidate: 1,
  }
}