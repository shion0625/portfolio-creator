import { GetUserIdsQuery } from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

export async function getUserIds(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUserIds({ limit: limit, offset: offset })
  return users
}
