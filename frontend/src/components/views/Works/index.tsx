import { Box } from '@mui/material'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkNodesList } from '~/components/templates/WorkNodesList'
import { WorkPagination } from '~/models/types'
import { useGetMore } from './hooks'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = ({ works }) => {

  const { staticData, status, onClick } = useGetMore()

  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        {/* <WorkList works={works} /> */}
        <WorkNodesList works={staticData} />
        {status._tag === "success" ?
          <WorkNodesList works={status.contents} /> :　
          "loading"
        }　
      </Box>
      <button onClick={onClick}>もっと</button>
    </>
  )
}

export default WorksView
