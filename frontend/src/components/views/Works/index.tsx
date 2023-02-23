import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { WorkPagination } from '~/models/types'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = memo(({ works }) => {
  return (
    <>
      <NavBar />
      <WorksInfScroll />
    </>
  )
})

export default WorksView
