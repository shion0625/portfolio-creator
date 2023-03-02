import { useFetchWorks } from './hooks/useFetchWorks'
import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { SortBy } from '~/models/types'

const WorksView: React.FC = memo(() => {
  const { pageInfo, works, onScroll } = useFetchWorks(SortBy.Update)
  return (
    <>
      <NavBar />
      <WorksInfScroll pageInfo={pageInfo} works={works} onScroll={onScroll} />
    </>
  )
})

export default WorksView
