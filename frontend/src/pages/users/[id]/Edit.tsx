import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import { GetUserServer, GetUserIdsServer } from '~/repositories/user'

import UserIDEditView from '~/components/views/UsersIDEdit'

const UserIDEdit: NextPage = () => {
  return (
  <UserIDEditView />
  )
}

export default UserIDEdit

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

  const { user } = await GetUserServer(params?.id)
  return {
    props: {
      user,
    },
    notFound: !user,
  }
}
