import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client'
import 'cross-fetch/polyfill'
import { API_URL } from './urls'
import { printCookie } from '../src/lib/setCookie';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let cookie = printCookie()
  if (cookie.accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: 'Bearer ' + cookie.accessToken,
      },
    }))
  }
  return forward(operation)
})

const createApolloClient = (ctx: { req: any }) => {
  return new ApolloClient({
    ssrMode: true,
    link: authMiddleware.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState = null, ctx: any) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}
