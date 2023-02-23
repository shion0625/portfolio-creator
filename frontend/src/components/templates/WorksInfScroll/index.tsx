import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useState } from 'react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { useGetMore } from '~/components/templates/WorksInfScroll/hooks/useGetMore'
import { Work } from '~/models/types'

type State = {
  message: string
}

const WorksInfScroll: React.FC = (): JSX.Element => {
  const parentRef = React.useRef<Element>(null)
  const [state, setState] = useState<State>({ message: '' })
  const { works, onClick } = useGetMore()

  const rowVirtualizer = useVirtualizer({
    count: works.hasNextPage ? works.contents.length + 1 : works.contents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 12,
  })

  useEffect(() => {
    let queue: NodeJS.Timeout
    window.addEventListener('scroll', () => {
      clearTimeout(queue)
      queue = setTimeout(() => {
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight
        if (offsetHeight - scroll_Y <= 1000 && state.message !== 'loading...' && offsetHeight > 1500) {
          setState({ message: 'loading...' })
          onClick()
          setState({ message: '' })
        }
      }, 1000)
    })
  }, [])

  return (
    <Box component='main' sx={{ m: 2 }} ref={parentRef}>
      <Grid
        container
        spacing={2}
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > works.contents.length - 1
          const post: Work = works.contents[virtualRow.index]
          return (
            <>
              {isLoaderRow ? (
                <CircularProgress />
              ) : (
                <Grid item key={virtualRow.index} xs={6} md={4} lg={3}>
                  <WorkImageCard work={post} />
                </Grid>
              )}
            </>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WorksInfScroll
