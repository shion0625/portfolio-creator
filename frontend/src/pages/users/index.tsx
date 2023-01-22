import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { UserPagination } from '~/models/types'
import { GetUsersNameServer } from '~/repositories/user'
import UsersView from '~/components/views/Users'

type Props = {
  users: UserPagination
}

const UsersPage: NextPage<Props> = ({ users }) => {
  return (
    <UsersView users={users} />
  )
}

export default UsersPage

export const getStaticProps: GetStaticProps = async () => {
  const { users } = await GetUsersNameServer()
  return {
    props: { users: users },
    revalidate: 1,
  }
}
