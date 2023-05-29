import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/models/client'
import { assertIsDefined } from '~/utils/assert'

type QueryType = 'GetUser' | 'GetUserIds' | 'GetUsersName'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const executeQuery = async (query: QueryType, variables: any = {}, delay = 30): Promise<any> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const data = await sdk[query](variables)
  if (!data) {
    return alert('error')
  }
  if (delay) {
    await sleep(delay)
  }
  return data
}
