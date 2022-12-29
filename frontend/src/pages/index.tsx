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
        <Link href='myPageEdit'>
          <a>myPageEdit</a>
        </Link>
      </div>
    </>
  )
}

export default Home
