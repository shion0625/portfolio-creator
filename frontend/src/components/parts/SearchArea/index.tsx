import { Search, SearchIconWrapper, StyledInputBase } from './style'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import type { KeyBoardHandler } from '~/components/templates/NavBar/hooks'

type SearchAreaProps = {
  inputElement: React.Ref<HTMLInputElement>
  onEnterKey: KeyBoardHandler<unknown>
  startComposition: () => void
  endComposition: () => void
}

const SearchArea: React.FC<SearchAreaProps> = ({ inputElement, onEnterKey, startComposition, endComposition }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={inputElement}
        type='text'
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={onEnterKey}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
      />
    </Search>
  )
}

export default SearchArea
