import { Box, Paper } from '@mui/material'
import React from 'react'
import NavBar from '~/components/screens/NavBar'
import { UserList } from '~/components/screens/UserList'
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
