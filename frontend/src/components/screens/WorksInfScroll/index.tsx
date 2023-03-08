import React from 'react'
import { WorkPagination, Work } from '~/models/types'
import InfScroll from '~/components/screens/InfScroll'
import { WorkImageCard } from '~/components/parts/WorkImageCard'

type Props = {
  pageInfo: WorkPagination["pageInfo"]
  works: WorkPagination["nodes"]
  onScroll: () => void
}

const WorksInfScroll: React.FC<Props> = ({ pageInfo, works, onScroll }): JSX.Element => {
  const renderItem = React.useCallback((work: Work) => {
    return <WorkImageCard work={work} />
  }, [])

  return (
    <InfScroll pageInfo={pageInfo} items={works} renderItem={renderItem} onScroll={onScroll} />
  )
}

export default WorksInfScroll
