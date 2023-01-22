import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import MuiLink from '~/components/parts/MuiLink'
import PrimarySearchAppBar from '~/components/templates/NavBar'
import { GetUserQuery } from '~/models/client'

type UserDetailProps = GetUserQuery & {
  session: any
}

const UsersIDView: React.FC<UserDetailProps> = ({ user, session }) => {
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <p>User Detail</p>
        <p>{`ID: ${user.id}`}</p>
        <p>{user.name}</p>
        {session?.user?.id == user.id && <Link href={`/users/${user.id}/Edit`}>編集</Link>}
        <Link href='/users' passHref>
          <MuiLink>ユーザ一覧に戻る</MuiLink>
        </Link>
      </Box>
    </>
  )
}

export default UsersIDView
