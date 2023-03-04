import { useFetchSearchWorks } from './hook/useFetchSearchWorks'
import { useSearch } from './hook/useSearch'
import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { SearchQuery, SearchDocument } from '~/models/client'
import { Model, SortBy } from '~/models/types'

type Props = {
  keyword: string
}

const SearchWorks: React.FC<Props> = ({ keyword }) => {
  const { searchData, onScroll } = useFetchSearchWorks(Model.Work, SortBy.Update, String(keyword))

  return <WorksInfScroll pageInfo={searchData.pageInfo} works={searchData.nodes} onScroll={onScroll} />
}

export default SearchWorks
