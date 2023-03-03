import { useFetchSearchWorks } from './hook/useFetchSearchWorks'
import React from 'react'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { SortBy } from '~/models/types'

type Props = {
  keyword: string
}

const SearchWorks: React.FC<Props> = ({ keyword }) => {
  const { pageInfo, works, onScroll } = useFetchSearchWorks(SortBy.Update, String(keyword))

  if (!works) {
    return <>error</>
  }

  return <WorksInfScroll pageInfo={pageInfo} works={works} onScroll={onScroll} />
}

export default SearchWorks
