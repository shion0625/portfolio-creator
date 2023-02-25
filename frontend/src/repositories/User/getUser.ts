import { GetUserQuery } from '~/models/client'
import { fetcherSSG } from '~/repositories/server'

export async function getUser(id: string): Promise<GetUserQuery> {
  const sdk = await fetcherSSG()
  const user = await sdk.GetUser({ id: id })
  return user
}
