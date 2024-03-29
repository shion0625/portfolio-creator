import React from 'react'
import { memo } from 'react'
import NavBar from '~/components/screens/NavBar'
import SearchTab from '~/components/templates/SearchTab'

const SearchView: React.FC = memo(function SearchView() {
  return (
    <>
      <NavBar />
      <SearchTab />
    </>
  )
})

export default SearchView
