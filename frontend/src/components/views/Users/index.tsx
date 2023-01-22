import { Box, Paper } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import MuiLink from '~/components/parts/MuiLink'
import NavBar from '~/components/templates/NavBar'
import { UserPagination, User } from '~/models/types'

type Props = {
  users: UserPagination
}

const UsersView: React.FC<Props> = ({ users }) => {
  return (
    <>
      <NavBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>ユーザの一覧</p>
        {users?.nodes.map((user: User) => {
          return (
            <div key={user.id}>
              <Link href={`/users/${user.id}`} passHref>
                <Paper elevation={3} sx={{ m: 2, py: 2, fontSize: 18 }}>
                  <MuiLink>{user.name ?? `名無しさん`}</MuiLink>
                </Paper>
              </Link>
            </div>
          )
        })}
      </Box>
    </>
  )
}

export default UsersView
