import { useFetchWorks } from './hooks/useFetchWorks'
import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/screens/NavBar'
import WorksInfScroll from '~/components/screens/WorksInfScroll'
import { SortBy } from '~/models/types'

const WorksView: React.FC = memo(function WorksView() {
  const { fetchData, onScroll } = useFetchWorks(SortBy.Update)
  return (
    <>
      <NavBar />
      <WorksInfScroll pageInfo={fetchData.pageInfo} works={fetchData.nodes} onScroll={onScroll} />
    </>
  )
})

export default WorksView
