import { useLazyQuery } from '@apollo/client'
import { GetWorksQuery, GetWorksDocument } from '~/models/client'

export const useGetWorks = () => {
  const [getWorks, { data, loading, error }] = useLazyQuery<GetWorksQuery>(GetWorksDocument)
  return { getWorks, worksData: data?.works.nodes, loading, error }
}
