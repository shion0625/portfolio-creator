import React from 'react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import InfScroll from '~/components/screens/InfScroll'
import { WorkPagination, Work } from '~/models/types'

type Props = {
  pageInfo: WorkPagination['pageInfo']
  works: WorkPagination['nodes']
  onScroll: () => void
}

const WorksInfScroll: React.FC<Props> = ({ pageInfo, works, onScroll }): JSX.Element => {
  const renderItem = React.useCallback((work: Work) => {
    return <WorkImageCard work={work} />
  }, [])

  return <InfScroll pageInfo={pageInfo} items={works} renderItem={renderItem} onScroll={onScroll} />
}

export default WorksInfScroll
