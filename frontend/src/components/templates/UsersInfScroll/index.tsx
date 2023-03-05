import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'
import { UserCard } from '~/components/parts/UserImageCard'
import { useInfiniteScroll } from '~/utils/hook/useInfiniteScroll';
import { UserPagination } from '~/models/types'

type Props = {
  pageInfo: UserPagination["pageInfo"]
  users: UserPagination["nodes"]
  onScroll: () => void
}

const UsersInfScroll: React.FC<Props> = ({ pageInfo, users, onScroll }): JSX.Element => {
  const parentRef = React.useRef<Element>(null)

  const rowVirtualizer = useVirtualizer({
    count: pageInfo.hasNextPage ? users.length + 1 : users.length,
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
          const isLoaderRow = virtualRow.index > users.length - 1
          const post = users[virtualRow.index]
          return (
            <Grid item key={'users:' + virtualRow.index} xs={6} md={4} lg={3}>
              {isLoaderRow ? <CircularProgress key={virtualRow.index} /> : <UserCard user={post} />}
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default UsersInfScroll
