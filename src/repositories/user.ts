import { GraphQLClient } from 'graphql-request'
import { GetUserQuery, GetUserIdsQuery } from '~/models/client'
import { getSdk } from '~/models/ssr.generated'
import { assertIsDefined } from '~/utils/assert'

async function fetcherSSG() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  return sdk
}

export async function GetUser(id?: string | string[]): Promise<GetUserQuery> {
  const sdk = await fetcherSSG()
  const user = await sdk.GetUser({ id: id })
  return user
}

export async function GetUserIds(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUserIds({ limit: limit, offset: offset })
  return users
}
