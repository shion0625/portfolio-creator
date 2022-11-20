import type { NextPage } from 'next'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import {GetUserDocument } from '../graphql/client'
import { GetUserQuery } from '../graphql/client'
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useQuery<GetUserQuery>(GetUserDocument, {
    variables: { id: 'eW9kb2dhd2E6MzM4MjYxNDc4MjQ3NjA4MTcxMA==' },
  })

  const signInClick = (e: any) => {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
    // signIn('github', { callbackUrl: 'http://localhost:3000' })
    return
  }

  const logoutClick = (e: any) => {
    signOut()
    return
  }

  const { data: session, status } = useSession()

  return (
    <>
      {!session && <>
        Not signed in <br />
        <button onClick={signInClick}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>}

      <div style={{ margin: '0 auto', width: '1000px' }}>{data?.user.id}
        <br />
        <Link href="/users"><a>users</a></Link>
        <br />
        <Link href="myPageEdit"><a>myPageEdit</a></Link>
      </div>
    </>

  )
}

export default Home
