import { Box, Paper } from '@mui/material'
import React from 'react'
import Link from '~/components/parts/Link'
import { User } from '~/models/types'

type Props = {
  users: User[]
}

export const UserList: React.FC<Props> = ({ users }): JSX.Element => {
  return (
    <Box>
      {users.map((user: User) => {
        return (
          <Box key={user.id}>
            <Link linkProps={{ href: `/users/${user.id}` }}>
              <Paper elevation={3} sx={{ m: 2, py: 2, fontSize: 18 }} role='presentation'>
                {user.name ?? `名無しさん`}
              </Paper>
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}
