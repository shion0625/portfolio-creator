import React from 'react'
import { UserPagination, User } from '~/models/types'
import InfScroll from '~/components/screens/InfScroll'
import { UserCard } from '~/components/parts/UserImageCard'

type Props = {
  pageInfo: UserPagination["pageInfo"]
  users: UserPagination["nodes"]
  onScroll: () => void
}

const UsersInfScroll: React.FC<Props> = ({ pageInfo, users, onScroll }): JSX.Element => {
  const renderItem = React.useCallback((user: User) => {
    return <UserCard user={user} />
  }, [])

  return (
    <InfScroll pageInfo={pageInfo} items={users} renderItem={renderItem} onScroll={onScroll} />
  )
}

export default UsersInfScroll
