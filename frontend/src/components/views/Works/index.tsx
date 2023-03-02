import { useFetchWorks } from './hooks/useFetchWorks'
import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import WorksInfScroll from '~/components/templates/WorksInfScroll'

const WorksView: React.FC = memo(() => {
  const { pageInfo, works, onScroll } = useFetchWorks()
  return (
    <>
      <NavBar />
      <WorksInfScroll pageInfo={pageInfo} works={works} onScroll={onScroll} />
    </>
  )
})

export default WorksView
