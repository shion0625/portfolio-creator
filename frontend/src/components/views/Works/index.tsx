import { Box } from '@mui/material'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkNodesList } from '~/components/templates/WorkNodesList'
import { Virtual } from '~/components/templates/Virtual'

import { WorkPagination } from '~/models/types'
import { useGetMore } from './hooks'
import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = memo(({ works }) => {

  return (
    <>
      <NavBar />
      <Virtual/>
    </>
  )
})

export default WorksView
