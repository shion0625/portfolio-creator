import { GetUserIdsQuery } from '~/models/client'
import { executeQuery } from '~/utils/hooks/useServerSideQuery'

export async function getUserIds(limit: number, offset: number): Promise<GetUserIdsQuery> {
  const users = executeQuery('GetUserIds', { limit: 2, offset })
  return users
}
