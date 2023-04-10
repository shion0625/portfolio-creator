import { Box, Paper } from '@mui/material'
import React from 'react'
import Link from '~/components/parts/Link'
import { User } from '~/models/types'

export type Props = {
  user: User
}

const UserCard: React.FC<Props> = ({ user }): JSX.Element => {
  return (
    <Box key={user.id}>
      <Link linkProps={{ href: `/users/${user.id}` }}>
        <Paper elevation={3} sx={{ m: 2, py: 2, fontSize: 18 }}>
          {user.name ?? `名無しさん`}
        </Paper>
      </Link>
    </Box>
  )
}

export default UserCard
