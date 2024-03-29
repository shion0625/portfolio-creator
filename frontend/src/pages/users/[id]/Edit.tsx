import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import UserIDEditView from '~/components/views/UsersIDEdit'
import { userRepository } from '~/repositories/index'

// const useForceUpdate = () => {
//   const [count, setCount] = useState(0);
//   return () => setCount(e => count + 1);
// }

const UserIDEdit: NextPage = () => {
  const [count, setCount] = useState(0)
  const router = useRouter()
  const { data: session, status } = useSession()

  // パスパラメータから値を取得
  const { id } = router.query
  //idが存在していない場合はエラー
  if (!id || Array.isArray(id)) {
    return <div>error</div>
  }
  //sessionが存在していない、sessionのIDとrouterのIDが一致していない場合エラー
  if (!session || !session.user || session.user.id != id) {
    return <div>error</div>
  }
  return <UserIDEditView id={id} session={session} />
}

export default UserIDEdit

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await userRepository.getUserIds(10, 0)
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
  }
}
