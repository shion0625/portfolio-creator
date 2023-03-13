import { GetUsersNameQuery } from '~/models/client'
import { executeQuery } from '~/utils/hook/useServerSideQuery'

export async function getUsersName(): Promise<GetUsersNameQuery> {
  const users = executeQuery('GetUsersName', { limit: 2, offset: 0 })
  return users
}
