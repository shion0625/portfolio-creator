import { useQuery, ApolloQueryResult, OperationVariables } from '@apollo/client'
import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { SearchQuery, SearchDocument } from '~/models/client'
import { WorkPagination, UserPagination, Model, SortBy, Node } from '~/models/types'

export type SearchDataState<T extends Model> = T extends Model.Work ? WorkPagination : UserPagination

export interface SearchResult<T extends Model> {
  searchResult: (T extends Model.Work ? WorkPagination : UserPagination) | undefined
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<SearchQuery>>
}

export type Variables<T extends Model> = {
  target: T
  limit: number
  sortBy: SortBy
  keyword: string
  searchedAt: string
  num: number
}

export const useSearch = <T extends Model>(
  variables: Variables<T>,
  setSearchData: Dispatch<SetStateAction<SearchDataState<T>>>,
  lastDataRef: MutableRefObject<Node | undefined>,
): SearchResult<T> => {
  const { data, loading, error, refetch } = useQuery<SearchQuery>(SearchDocument, {
    variables: variables,
    onCompleted: (data) => {
      const searchResult = data.search as SearchResult<T>['searchResult']
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
          console.log(lastDataRef)
        }
      }
    },
  })

  return {
    searchResult: data?.search as SearchResult<T>['searchResult'],
    refetch,
  }
}
