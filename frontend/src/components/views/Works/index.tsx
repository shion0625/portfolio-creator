import { useGetMore } from './hooks'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/templates/NavBar'
import { Virtual } from '~/components/templates/Virtual'
import { WorkList } from '~/components/templates/WorkList'
import { WorkNodesList } from '~/components/templates/WorkNodesList'
import { WorkPagination } from '~/models/types'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = memo(({ works }) => {
  return (
    <>
      <NavBar />
      <Virtual />
    </>
  )
})

export default WorksView
