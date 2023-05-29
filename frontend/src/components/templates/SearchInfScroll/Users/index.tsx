import { useFetchSearchWorks } from '../hooks'
import React from 'react'
import UsersInfScroll from '~/components/screens/UsersInfScroll'
import { Model, SortBy } from '~/models/types'

type Props = {
  keyword: string
}

const SearchInfScrollUsers: React.FC<Props> = ({ keyword }) => {
  const { searchData, onScroll } = useFetchSearchWorks(Model.User, SortBy.Update, String(keyword))

  return <UsersInfScroll pageInfo={searchData.pageInfo} users={searchData.nodes} onScroll={onScroll} />
}

export default SearchInfScrollUsers
