import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import SearchInfScrollUsers from '~/components/templates/SearchInfScroll/Users'
import SearchInfScrollWorks from '~/components/templates/SearchInfScroll/Works'
import { currentTabState } from '~/stores/CurrentTab'

const SearchTab: React.FC = () => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState) // Recoil状態を使用する

  const { keyword } = router.query

  useEffect(() => {
    if (router.isReady) {
      setCurrentTab(String(router.query.target))
      setIsReady(true)
    }
  }, [router, setCurrentTab])

  if (!isReady) {
    return <>loading...</>
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='tab'>
            <Tab label='users' value='users' />
            <Tab label='works' value='works' />
          </TabList>
        </Box>
        <TabPanel value='users'>
          <SearchInfScrollUsers keyword={String(keyword)} />
        </TabPanel>
        <TabPanel value='works'>
          <SearchInfScrollWorks keyword={String(keyword)} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SearchTab
