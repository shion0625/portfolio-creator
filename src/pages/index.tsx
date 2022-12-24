import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import SignIn from '~/components/SignIn'
import { GetUserDocument } from '~/models/client'
import { GetUserQuery } from '~/models/client'

const Home: NextPage = () => {
  // const { data } = useQuery<GetUserQuery>(GetUserDocument, {
  //   variables: { id: 'eW9kb2dhd2E6MzM4MjYxNDc4MjQ3NjA4MTcxMA==' },
  // })

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
