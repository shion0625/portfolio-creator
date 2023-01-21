import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import Link from 'next/link'
import SignIn from '~/components/SignIn'
import { GetUserQuery, GetUserIdsQuery, GetUsersNameQuery, GetUserDocument } from '~/models/client'
import { useQuery } from '@apollo/client'

const Home: NextPage = () => {
  // const { data, loading, error } = useQuery<GetUserQuery>(GetUserDocument, {
  //   fetchPolicy: 'cache-and-network',
  //   variables: { id: "clce9hebi0000ss6p88alg7gd" },
  // })
  // console.log(data)
  return (
    <>
      <SignIn />
      <div style={{ margin: '0 auto', width: '1000px' }}>
        {/* {data?.user.id} */}
        <br />
        <Link href='/users'>
          <a>users</a>
        </Link>
        <br />
        <Link href='/works'>
          <a>works</a>
        </Link>
        <Typography color='success.main' />
      </div>
    </>
  )
}

export default Home
