import { GetWorkNodesQuery, GetWorkNodesDocument } from '~/models/client'
import { useLazyQuery } from '@apollo/client';

export const useGetWorks = () => {
  const [ getWorks,{ data, loading, error } ]= useLazyQuery<GetWorkNodesQuery>(GetWorkNodesDocument)
  return {getWorks, worksData: data?.workNodes, loading, error}
}
