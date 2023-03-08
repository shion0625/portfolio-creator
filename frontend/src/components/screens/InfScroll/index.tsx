import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'
import { useInfiniteScroll } from './hook'
import { PaginationInfo } from '~/models/types'

type Props<T> = {
  pageInfo: PaginationInfo
  items: T[]
  renderItem: (item: T) => React.ReactNode
  onScroll: () => void
}

const InfScroll = <T extends unknown>({ pageInfo, items, renderItem, onScroll }: Props<T>): JSX.Element => {
  const parentRef = React.useRef<Element>(null)

  const rowVirtualizer = useVirtualizer({
    count: pageInfo.hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 12,
  })

  const isLoading = useInfiniteScroll(onScroll)

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
          const isLoaderRow = virtualRow.index > items.length - 1
          const item = items[virtualRow.index]
          return (
            <Grid item key={virtualRow.index} xs={6} md={4} lg={3}>
              {isLoaderRow ?
                <CircularProgress /> :
                renderItem(item)
              }
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default InfScroll
