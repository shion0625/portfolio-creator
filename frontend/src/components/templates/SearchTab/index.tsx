import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
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
  }, [router])

  if (!isReady) {
    return <>loading...</>
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
    console.log(currentTab)
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
          <div>f</div>
          {/* <UserPagination keyword={String(keyword)} limit={10} page={userPage} setPage={setUserPage} /> */}
        </TabPanel>
        <TabPanel value='works'>
          <SearchInfScrollWorks keyword={String(keyword)} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SearchTab
