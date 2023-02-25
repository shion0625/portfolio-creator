import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useState } from 'react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { useGetMore } from '~/components/templates/WorksInfScroll/hooks/useGetMore'

type State = {
  message: string
}

const WorksInfScroll: React.FC = (): JSX.Element => {
  const parentRef = React.useRef<Element>(null)
  const [state, setState] = useState<State>({ message: '' })
  const { pageInfo, works, onScroll } = useGetMore()

  const rowVirtualizer = useVirtualizer({
    count: pageInfo.hasNextPage ? works.length + 1 : works.length,
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
          onScroll()
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
          const isLoaderRow = virtualRow.index > works.length - 1
          const post = works[virtualRow.index]
          return (
            <Grid item key={'works:' + virtualRow.index} xs={6} md={4} lg={3}>
              {isLoaderRow ? <CircularProgress key={virtualRow.index} /> : <WorkImageCard work={post} />}
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WorksInfScroll
