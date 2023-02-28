import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import WorksInfScroll from '~/components/templates/WorksInfScroll'

const WorksView: React.FC = memo(() => {
  return (
    <>
      <NavBar />
      <WorksInfScroll />
    </>
  )
})

export default WorksView
