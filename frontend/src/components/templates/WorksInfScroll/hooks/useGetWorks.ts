import { GetWorksQuery, GetWorksDocument } from '~/models/client'
import { useLazyQuery } from '@apollo/client'

export const useGetWorks = () => {
  const [getWorks, { data, loading, error }] = useLazyQuery<GetWorksQuery>(GetWorksDocument)
  return { getWorks, worksData: data?.works.nodes, loading, error }
}
