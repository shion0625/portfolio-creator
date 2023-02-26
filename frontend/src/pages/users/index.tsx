import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import UsersView from '~/components/views/Users'
import { UserPagination } from '~/models/types'
import { userRepository } from '~/repositories/index'

type Props = {
  users: UserPagination
}

const UsersPage: NextPage<Props> = ({ users }) => {
  return <UsersView users={users} />
}

export default UsersPage

export const getStaticProps: GetStaticProps = async () => {
  const { users } = await userRepository.getUsersName()
  return {
    props: { users: users },
    revalidate: 1,
  }
}
