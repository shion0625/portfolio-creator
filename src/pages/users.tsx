import { Box, Paper } from '@mui/material'
import { GraphQLClient } from 'graphql-request'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import PrimarySearchAppBar from '~/components/NavBar'
import { assertIsDefined } from '~/libs/assert'
import { getSdk } from '~/models/ssr.generated'
import { UserPagination, User } from '~/models/types'

type Props = {
  users: UserPagination
}

const Users: NextPage<Props> = ({ users }) => {
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>ユーザの一覧</p>
        {users?.nodes.map((user: User) => {
          return (
            <div key={user.id}>
              <Link href={`/users/${user.id}`}>
                <Paper elevation={3} sx={{ m: 2, py: 2, fontSize: 18 }}>
                  <a>{user.name}</a>
                </Paper>
              </Link>
              <Link href={`/users/${user.id}/Edit`}>編集</Link>
            </div>
          )
        })}
      </Box>
    </>
  )
}

export default Users

export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)

  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const { users } = await sdk.GetUsersName({ limit: 10, offset: 0 })
  return {
    props: { users: users },
    revalidate: 1,
  }
}
