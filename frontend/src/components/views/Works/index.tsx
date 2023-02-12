import { Box } from '@mui/material'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkNodesList } from '~/components/templates/WorkNodesList'
import { WorkPagination } from '~/models/types'
import { useGetMore } from './hooks'
import CircularProgress from '@mui/material/CircularProgress';
import { Work } from '~/models/types'
import { useState, useEffect, useCallback, memo } from 'react'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = memo(({ works }) => {

  const { staticData, status, onClick } = useGetMore()
  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        {/* <WorkList works={works} /> */}
        <WorkNodesList works={staticData} />
        {status._tag === "success" ?
          <WorkNodesList works={status.contents} /> :　
          <CircularProgress />
        }　
      </Box>
      <button onClick={onClick}>もっと</button>
    </>
  )
})

export default WorksView
