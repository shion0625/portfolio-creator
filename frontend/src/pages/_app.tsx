import { ApolloProvider } from '@apollo/client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { initializeApollo } from '~/libs/apollo/apolloClient'
import '~/styles/globals.css'

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
