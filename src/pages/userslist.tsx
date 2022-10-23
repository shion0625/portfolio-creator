import React from 'react'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import { initializeApollo, client } from '../lib/apolloClient'
import { GetUsersDocument } from "../../graphql/dist/client";
import { GetUsersQuery, UserPagination, User } from "../../graphql/dist/client";
import { GetTodoQuery, GetTodoDocument } from "../../graphql/dist/client";
import { gql } from "@apollo/client";


type Props = {
  users: ({
    __typename?: 'UserPagination';
    pageInfo: {
      __typename?: 'PaginationInfo';
      page: number;
      paginationLength: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      count: number;
      totalCount: number;
    };
    nodes: Array<{
      __typename?: 'User';
      id: string;
      name: string;
      works?: {
        __typename?: 'WorkPagination';
        nodes: Array<{
          __typename?: 'Work';
          title: string;
          summary?: string | null;
          image_url?: string | null;
          duration?: string | null;
          number_of_people?: number | null;
          language?: string | null;
          role?: string | null;
          url: string;
          brief_story?: string | null;
          user: {
            __typename?: 'User';
            id: string;
            name: string;
          };
        }>;
      } | null;
    }>;
  })
}

const UsersList: NextPage<any> = ({ users }) => {
  console.log(users)
  return (
    <>
      {/* <p>SG+ISR</p>
      {users?.nodes.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a>kaito</a>
          </Link>
        )
      })} */}
    </>
  )

}

export default UsersList

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: GetTodoDocument,
  })

  // console.log(error)
  return {
    props: {users: "kaito"},
    revalidate: 1,
  }
}
