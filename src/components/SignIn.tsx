import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useMutation } from '@apollo/client';
import { LoginDocument } from '../graphql/client'
import { LoginMutation } from '../graphql/client'
import { signIn, signOut, useSession } from 'next-auth/react';

const SignIn: NextPage = () => {
  const { data: session, status } = useSession()

  const [Login, { data, loading, error }] = useMutation<LoginMutation>(LoginDocument)

  useEffect(() => {
    (async () => {
      if (status === 'authenticated' && session && session.user && session.user.email) {
        let jwtToken = await Login({ variables: { id: session.user.id, email: session.user.email } })
        session.accessToken = jwtToken?.data?.login.token
      }
    })();
  }, [status]);

  const signInClick = (e: any) => {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
    // signIn('github', { callbackUrl: 'http://localhost:3000' })
    return
  }

  const signOutClick = (e: any) => {
    signOut()
    return
  }



  return (
    <>
      {!session && <>
        Not signed in <br />
        <button onClick={signInClick}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session?.user?.name} <br />
        <button onClick={signOutClick}>Sign out</button>
      </>
      }
    </>
  )
}

export default SignIn
