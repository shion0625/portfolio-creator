import React from 'react'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import { GraphQLClient } from 'graphql-request';
import { getSdk } from "../graphql/ssr.generated"
import { UserPagination, User } from "../graphql/types"
import { assertIsDefined } from "../lib/assert";

type Props = {
  users: UserPagination
}

const UsersList: NextPage<Props> = ({ users }) => {
  return (
    <>
      <p>SG+ISR</p>
      {users?.nodes.map((user :User) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a>{ user.name}</a>
          </Link>
        )
      })}
    </>
  )

}

export default UsersList

export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl);
  const client = new GraphQLClient(apiBaseUrl)

  const sdk = getSdk(client)
  const { users } = await sdk.GetUsersName({limit: 10, offset: 0})
  return {
    props: { users: users },
    revalidate: 1,
  }
}
