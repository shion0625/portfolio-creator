import { Box } from '@mui/material'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from '~/components/parts/Link'
import PrimarySearchAppBar from '~/components/screens/NavBar'
import { GetUserQuery } from '~/models/client'

type UserDetailProps = GetUserQuery & {
  session: Session
}

const UsersIDView: React.FC<UserDetailProps> = ({ user, session }) => {
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>User Detail</p>
        <p>{`ID: ${user.id}`}</p>
        <p>{user.name}</p>
        {session?.user?.id == user.id && <Link linkProps={{ href: `/users/${user.id}/Edit` }}>編集</Link>}
        <Link linkProps={{ href: `/users` }}>ユーザ一覧に戻る</Link>
      </Box>
    </>
  )
}

export default UsersIDView
