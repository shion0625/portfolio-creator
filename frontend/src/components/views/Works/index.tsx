import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { useGetMore } from './hooks/useGetMore'

const WorksView: React.FC = memo(() => {
    const { pageInfo, works, onScroll } = useGetMore()
  return (
    <>
      <NavBar />
      <WorksInfScroll pageInfo={pageInfo} works={ works } onScroll={onScroll} />
    </>
  )
})

export default WorksView
