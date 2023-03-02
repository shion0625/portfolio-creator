import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { SortBy } from '~/models/types'
import {useFetchSearchWorks} from './hook/useFetchSearchWorks'

const SearchTab: React.FC = () => {
  const router = useRouter()
  const { target, keyword } = router.query
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState(String(target))
  const { pageInfo, works, onScroll } = useFetchSearchWorks(SortBy.Update, String(keyword))

  useEffect(() => {
    if (router.isReady) {
      setValue(String(target));
    }
  }, [router, target]);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) {
    return <>loading...</>;
  }

  if (!works) {
    return <>error</>;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='tab'>
            <Tab label='users' value='users' />
            <Tab label='works' value='works' />
          </TabList>
        </Box>
        <TabPanel value='users'>
          <div>f</div>
          {/* <UserPagination keyword={String(keyword)} limit={10} page={userPage} setPage={setUserPage} /> */}
        </TabPanel>
        <TabPanel value='works'>
          <WorksInfScroll pageInfo={pageInfo} works={works} onScroll={onScroll} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SearchTab
