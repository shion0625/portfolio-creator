import { GetUserQuery } from '~/models/client'
import { executeQuery } from '~/utils/hook/useServerSideQuery'

export async function getUser(id: string): Promise<GetUserQuery> {
  const user = executeQuery(
    'GetUser', { id})
  return user
}
