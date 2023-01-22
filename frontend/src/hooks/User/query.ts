import { useQuery } from '@apollo/client'
import { GetUserAuthQuery, GetUserAuthDocument } from '~/models/client'

export const GetUserAuth = (id: string) => {
  const { data, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
  })
  if (loading) return 'loading'
  if (error) return 'error'
  if (!data) return 'dataNotFound'

  return {
    userAuth: data.userAuth
  }
}
