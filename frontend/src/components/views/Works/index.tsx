import { Box } from '@mui/material'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkNodesList } from '~/components/templates/WorkNodesList'
import { WorkPagination } from '~/models/types'
import { useGetMore } from '~/hooks/util/getMore'
import { useGetWorks } from '~/hooks/Work/query'

type Props = {
  works: WorkPagination
}

const WorksView: React.FC<Props> = ({ works }) => {

  const { data, status, onClick } = useGetMore()

  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        <WorkList works={works} />
        {data &&
          <WorkNodesList works={data} />
        }
        {/* {status._tag === "success" ?
          <WorkNodesList works={status.contents} /> :　
          "loading"
        }　最新のデータ */}
      </Box>
    </>
  )
}

export default WorksView
