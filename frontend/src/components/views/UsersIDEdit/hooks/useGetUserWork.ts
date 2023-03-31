import { useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { GetUserAuthDocument, GetUserAuthQuery } from '~/models/client'

type useGetUserWorkProps = {
  id: string
  onCompleted?: (data: GetUserAuthQuery) => void
  onError?: (error: Error) => void
}

export const useGetUserWork = ({id, onCompleted, onError}:useGetUserWorkProps) => {
  const { data, refetch, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
    onCompleted,
    onError,
  })

  const onUpdate = useCallback(() => {
    refetch()
  }, [refetch])

  return { userData: data?.userAuth, onUpdate, loading, error }
}
