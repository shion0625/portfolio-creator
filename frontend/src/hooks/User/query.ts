import { useQuery } from '@apollo/client'
import React, { useCallback, useRef, useState } from 'react'
import { GetUserAuthQuery, GetUserAuthDocument } from '~/models/client'

// export const GetUserAuth = (id: string) => {
//   const { data, refetch: refetchUserData, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
//     variables: { id: id },
//   })
//   if (loading) return 'loading'
//   if (error) return 'error'
//   if (!data) return 'dataNotFound'

//   return [data, refetch]
// }

export function useGetUserWork(id: string) {
  const { data, refetch, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
  })

  // const onUpdate = useCallback(async () => {
  //   refetch() // 更新が完了したら再取得の処理を行う
  // },[])

  return { userData: data?.userAuth, onUpdate: refetch }
}
