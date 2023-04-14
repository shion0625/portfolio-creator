import { useFetchSearchWorks } from '../hook'
import React, { memo } from 'react'
import WorksInfScroll from '~/components/screens/WorksInfScroll'
import { Model, SortBy } from '~/models/types'

type Props = {
  keyword: string
}

const SearchInfScrollWorks: React.FC<Props> = ({ keyword }) => {
  const { searchData, onScroll } = useFetchSearchWorks(Model.Work, SortBy.Update, String(keyword))
  return <WorksInfScroll pageInfo={searchData.pageInfo} works={searchData.nodes} onScroll={onScroll} />
}

export default memo(SearchInfScrollWorks)
