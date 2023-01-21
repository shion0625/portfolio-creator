import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useCallback, useEffect } from 'react'
import { setCookieToken, destroyCookieToken } from '~/libs/nookies/setCookie'
import { LoginDocument } from '~/models/client'
import { LoginMutation } from '~/models/client'

const SignIn: NextPage = () => {
  const { data: session, status } = useSession()

  const [Login, { data, loading, error }] = useMutation<LoginMutation>(LoginDocument)

  const getJetToken = async (user_id: string, user_email: string) => {
    let jwtToken = await Login({
      variables: { id: user_id, email: user_email },
    })
    setCookieToken(jwtToken?.data?.login.token)
  }

  useEffect(() => {
    (async () => {
      if (status == 'authenticated' && session && session.user && session.user.email) {
        getJetToken(session.user.id, session.user.email)
      }
    })()
  }, [status])

  const signInClick = (e: any) => {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
    // signIn('github', { callbackUrl: 'http://localhost:3000' })
    return
  }

  const signOutClick = (e: any) => {
    signOut()
    destroyCookieToken()
    return
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signInClick}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session?.user?.id} <br />
          <button onClick={signOutClick}>Sign out</button>
        </>
      )}
    </>
  )
}

export default SignIn
