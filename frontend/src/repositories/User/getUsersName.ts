import { GetUsersNameQuery } from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

export async function getUsersName(): Promise<GetUsersNameQuery> {
  const sdk = await fetcherSSG()
  const users = await sdk.GetUsersName({ limit: 10, offset: 0 })
  return users
}
