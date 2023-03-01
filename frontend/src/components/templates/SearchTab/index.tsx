import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { UserPagination } from '~/components/templates/Pagination/UserPagination'
import { WorkPagination } from '~/components/templates/Pagination/WorkPagination'

const SearchTab: React.FC = () => {
  const router = useRouter()
  const { target, keyword } = router.query
  const [value, setValue] = useState(String(target))
  const [workPage, setWorkPage] = useState<number>(1)
  const [userPage, setUserPage] = useState<number>(1)
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
          <UserPagination keyword={String(keyword)} limit={10} page={userPage} setPage={setUserPage} />
        </TabPanel>
        <TabPanel value='works'>
          <WorkPagination keyword={String(keyword)} limit={10} page={workPage} setPage={setWorkPage} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SearchTab
