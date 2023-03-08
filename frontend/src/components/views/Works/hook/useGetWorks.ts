import { useQuery, ApolloQueryResult, OperationVariables } from '@apollo/client'
import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { GetWorksQuery, GetWorksDocument } from '~/models/client'
import { WorkPagination, SortBy, Node } from '~/models/types'

export interface SearchResult {
  fetchResult: WorkPagination
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<GetWorksQuery>>
}

export type Variables = {
  limit: number
  sortBy: SortBy
  searchedAt: string
  num: number
}

export const useQueryWorks = (
  variables: Variables,
  setSearchData: Dispatch<SetStateAction<WorkPagination>>,
  lastDataRef: MutableRefObject<Node | undefined>,
): SearchResult => {
  const { data, loading, error, refetch } = useQuery<GetWorksQuery>(GetWorksDocument, {
    variables: variables,
    onCompleted: (data) => {
      const searchResult = data.works as WorkPagination
      if (searchResult) {
        setSearchData((prev) => ({
          ...prev,
          pageInfo: {
            ...prev.pageInfo,
            hasNextPage: searchResult.pageInfo.hasNextPage ?? prev.pageInfo.hasNextPage,
          },
          nodes: [...prev.nodes, ...searchResult.nodes],
        }))
        if (searchResult.nodes.length !== 0) {
          lastDataRef.current = searchResult.nodes[searchResult.nodes.length - 1]
        }
      }
    },
  })

  return {
    fetchResult: data?.works as WorkPagination,
    refetch,
  }
}
