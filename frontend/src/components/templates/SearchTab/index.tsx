import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const SearchTab:React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tab">
            <Tab label="users" value="users" />
            <Tab label="works" value="works" />
          </TabList>
        </Box>
        <TabPanel value="users">Item One</TabPanel>
        <TabPanel value="works">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}

export default SearchTab
