import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'
import { initializeApollo } from '../../constants/apolloClient'

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
