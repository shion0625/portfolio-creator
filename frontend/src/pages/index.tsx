import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import MuiLink from '~/components/parts/MuiLink'
import NavBar from '~/components/templates/NavBar'
import SignIn from '~/components/templates/SignIn'
import { GetUserQuery, GetUserIdsQuery, GetUsersNameQuery, GetUserDocument } from '~/models/client'

const Home: NextPage = () => {
  // const { data, loading, error } = useQuery<GetUserQuery>(GetUserDocument, {
  //   fetchPolicy: 'cache-and-network',
  //   variables: { id: "clce9hebi0000ss6p88alg7gd" },
  // })
  // console.log(data)
  return (
    <>
      <NavBar />
      <SignIn />
      <div style={{ margin: '0 auto', width: '1000px' }}>
        {/* {data?.user.id} */}
        <br />
        <Link href='/users' passHref>
          <MuiLink>ユーザ一覧</MuiLink>
        </Link>
        <br />
        <Link href='/works' passHref>
          <MuiLink>ポートフォリオ一覧</MuiLink>
        </Link>
        <Link href='/works' passHref>
          <a href='/works'> works</a>
        </Link>
      </div>
    </>
  )
}

export default Home
