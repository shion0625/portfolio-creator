import { Box } from '@mui/material'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkPagination } from '~/models/types'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = ({ works }) => {
  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        <WorkList works={works} />
      </Box>
    </>
  )
}

export default WorksView
