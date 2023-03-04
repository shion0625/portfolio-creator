import { useFetchSearchWorks } from './hook/useFetchSearchWorks'
import React, { useEffect } from 'react'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { Model, SortBy } from '~/models/types'
import { useSearch } from './hook/useSearch'
import { useQuery, useLazyQuery} from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'

type Props = {
  keyword: string
}

const SearchWorks: React.FC<Props> = ({ keyword }) => {
  const { searchData, onScroll } = useFetchSearchWorks(Model.Work, SortBy.Update, String(keyword))
  console.log(searchData)

    // const { data, loading, error } = useQuery<SearchQuery>(SearchDocument, {
    // variables: {
    //   target: Model.Work,
    //   limit: 10,
    //   sortBy: SortBy.Update,
    //   keyword,
    //   num: 99999,
    //   searchedAt: "2023-03-05 02:30:46.510146"
    // }
    // })
  // const { search, searchResult } = useSearch({
  //   target: Model.Work,
  //   limit: 10,
  //   sortBy: SortBy.Update,
  //   keyword,
  //   num: 99999,
  //   searchedAt: "2023-03-05 02:30:46.510146"
  // })


  return <WorksInfScroll pageInfo={searchData.pageInfo} works={searchData.nodes} onScroll={onScroll} />
  return <></>
}

export default SearchWorks
