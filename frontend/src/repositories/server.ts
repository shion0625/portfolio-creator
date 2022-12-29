import { assertIsDefined } from '~/utils/assert'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/models/client'

export async function fetcherSSG() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  return sdk
}
