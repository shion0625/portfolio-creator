import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import Link from 'next/link'
import SignIn from '~/components/SignIn'

const Home: NextPage = () => {
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
        <Link href='works'>
          <a>works</a>
        </Link>
        <Typography color='success.main' />
      </div>
    </>
  )
}

export default Home
