import { Search, SearchIconWrapper, StyledInputBase } from './style'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

const SearchArea: React.FC = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
    </Search>
  )
}

export default SearchArea
