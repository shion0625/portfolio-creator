import Grid from '@mui/material/Grid'
import React, {useEffect} from 'react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { Work } from '~/models/types'
import { Virtualizer } from '@tanstack/react-virtual'
import CircularProgress from '@mui/material/CircularProgress';
import { useVirtualizer } from '@tanstack/react-virtual'
import { useGetMore } from '~/components/views/Works/hooks'
import { Box } from '@mui/material'

type Props = {
  works: Work[]
}

export const Virtual: React.FC = (): JSX.Element => {

  const parentRef = React.useRef<Element>(null)
  const { allData, onClick } = useGetMore()

    const rowVirtualizer = useVirtualizer({
    count: allData.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 12,
    debug: true
  })

  return (
    <Box component='main' sx={{ m: 2 }} ref={parentRef}>
      <Grid container spacing={2} sx={{
        height: `${rowVirtualizer.getTotalSize()}px`
      }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allData.length - 1
          const post: Work = allData[virtualRow.index]
          return (
            <>
              {isLoaderRow ?
                <CircularProgress />
                :
              <Grid item key={post.id + virtualRow.index} xs={6} md={4} lg={3}>
                <WorkImageCard work={post} />
              </Grid>
                }
            </>
          )
        })}
        </Grid>
        <button onClick={onClick}>もっと</button>　
          {/* <CircularProgress /> */}
    </Box>
  )
}
