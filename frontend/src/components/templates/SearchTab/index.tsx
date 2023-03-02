import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserPagination } from '~/components/templates/Pagination/UserPagination'
import { useSearch } from '~/components/templates/Pagination/hook'
import WorksInfScroll from '~/components/templates/WorksInfScroll'
import { Model } from '~/models/types'

const SearchTab: React.FC = () => {
  const router = useRouter()
  const { target, keyword } = router.query
  const [value, setValue] = useState(String(target))
  const [workPage, setWorkPage] = useState<number>(1)
  const [userPage, setUserPage] = useState<number>(1)
  const { search } = useSearch(Model.Work, String(keyword), 10, '2023-02-23 02:30:46.510146', 9999)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  if (!search) return <>error</>
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
          <UserPagination keyword={String(keyword)} limit={10} page={userPage} setPage={setUserPage} />
        </TabPanel>
        <TabPanel value='works'>
          <WorksInfScroll pageInfo={search.pageInfo} works={search.nodes} onScroll={onScroll} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SearchTab
