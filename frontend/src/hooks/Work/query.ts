import { useQuery } from '@apollo/client'
import { GetWorksQuery, GetWorksDocument } from '~/models/client'

export const useGetWorks = (limit: number, offset: number) => {
  const { data, loading, error } = useQuery<GetWorksQuery>(GetWorksDocument, {
    variables:{limit: limit, offset: offset}
  })
  return {data, loading, error}
}
