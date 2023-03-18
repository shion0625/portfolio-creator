import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import SearchView from '~/components/views/Search'

const Search: NextPage = () => {
              const { data: session, status } = useSession()
  return <SearchView />
}

export default Search
