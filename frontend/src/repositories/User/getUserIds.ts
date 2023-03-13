import { GetUserIdsQuery } from '~/models/client'
import { executeQuery } from '~/utils/hook/useServerSideQuery'

export async function getUserIds(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const users = executeQuery('GetUserIds', { limit, offset })
  return users
}
