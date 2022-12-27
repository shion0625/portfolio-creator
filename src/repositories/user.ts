import { useQuery } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'
import { GetUserQuery, GetUserIdsQuery, GetUsersNameQuery, GetUserDocument, getSdk } from '~/models/client'
import { assertIsDefined } from '~/utils/assert'

async function fetcherSSG() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  return sdk
}

export function GetUser(id?: string | string[]) {
  const { data } = useQuery<GetUserQuery>(GetUserDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id },
  })
  return data?.user
}

export async function GetUserServer(id: string): Promise<GetUserQuery> {
  const sdk = await fetcherSSG()
  const user = await sdk.GetUser({ id: id })
  return user
}

export async function GetUserIdsServer(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUserIds({ limit: limit, offset: offset })
  return users
}

export async function GetUsersNameServer(): Promise<GetUsersNameQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUsersName({ limit: 10, offset: 0 })
  return users
}
