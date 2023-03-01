import { Box, Paper } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import MuiLink from '~/components/parts/MuiLink'
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
            <Link href={`/users/${user.id}`} passHref>
              <Paper elevation={3} sx={{ m: 2, py: 2, fontSize: 18 }}>
                <MuiLink>{user.name ?? `名無しさん`}</MuiLink>
              </Paper>
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}
