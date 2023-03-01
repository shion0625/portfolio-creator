import { Box, Paper } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import MuiLink from '~/components/parts/MuiLink'
import NavBar from '~/components/templates/NavBar'
import { UserList } from '~/components/templates/UserList'
import { UserPagination } from '~/models/types'

type Props = {
  users: UserPagination
}

const UsersView: React.FC<Props> = ({ users }) => {
  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>ユーザの一覧</p>
        <UserList users={users.nodes} />
      </Box>
    </>
  )
}

export default UsersView
