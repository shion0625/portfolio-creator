import { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GetUserAuthDocument, GetUserAuthQuery } from '~/models/client'

export const useGetUserWork = (id: string) => {
  const { data, refetch, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
  })

  const onUpdate = useCallback(() => {
    refetch()
  }, [refetch])

  return { userData: data?.userAuth, onUpdate , loading, error}
}
