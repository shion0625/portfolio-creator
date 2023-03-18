import { ApolloProvider } from '@apollo/client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Theme from '~/components/views/Theme'
import { initializeApollo } from '~/libs/apollo/apolloClient'

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const client = initializeApollo()
  return (
    <RecoilRoot>
      <Theme>
  <ApolloProvider client={client}>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ApolloProvider>
      </Theme>
    </RecoilRoot>
  )
}

export default MyApp
