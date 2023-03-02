import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SearchWorks from '~/components/templates/SearchWorks';

type Query = {
  target?: string;
  keyword?: string;
};

const SearchTab: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<Query>(router.query);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(router.isReady);
    setQuery(router.query);
  }, [router]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setQuery({ ...query, target: newValue });
  };

  if (!isReady) {
    return <>loading...</>;
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={query.target ?? 'works'}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='tab'>
            <Tab label='users' value='users' />
            <Tab label='works' value='works' />
          </TabList>
        </Box>
        <TabPanel value='users'>
          <div>f</div>
          {/* <UserPagination keyword={query.keyword} limit={10} page={userPage} setPage={setUserPage} /> */}
        </TabPanel>
        <TabPanel value='works'>
          <SearchWorks keyword={query.keyword ?? ''} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SearchTab;
