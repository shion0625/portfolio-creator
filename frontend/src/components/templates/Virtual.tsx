import Grid from '@mui/material/Grid'
import React, {useEffect, useCallback} from 'react'
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
  const { works, onClick } = useGetMore()

    const rowVirtualizer = useVirtualizer({
    count: works.hasNextPage ? works.contents.length + 1 : works.contents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 12,
    })

  const onScroll = useCallback(() => {
    const el = parentRef.current
    if (el) {
      const rate = window.pageYOffset / (el.scrollHeight - el.scrollTop)
        // スクロール位置の割合が8割を超えている場合は描画するアイテムを追加
      if (rate > 0.6) {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= works.contents.length - 1 &&
      works.hasNextPage
    ) {
      onClick();
    }
      }
    }
  },[])

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box component='main' sx={{ m: 2 }} ref={parentRef}>
      <Grid container spacing={2} sx={{
        height: `${rowVirtualizer.getTotalSize()}px`
      }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > works.contents.length - 1
          const post: Work = works.contents[virtualRow.index]
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
        {/* <button onClick={onClick}>もっと</button>　 */}
    </Box>
  )
}
