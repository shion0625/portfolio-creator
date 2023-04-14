import { useQuery, ApolloQueryResult, OperationVariables } from '@apollo/client'
import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { SearchQuery, SearchDocument} from '~/models/client'
import { WorkPagination, UserPagination, Model, SortBy, Node } from '~/models/types'
import { useSearchQuery } from '~/libs/graphql/query/common.generated'

export type SearchDataState<T extends Model> = T extends Model.Work ? WorkPagination : UserPagination

export interface SearchResult<T extends Model> {
  searchResult: (T extends Model.Work ? WorkPagination : UserPagination) | undefined
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<SearchQuery>>
  loading: boolean
  error: any
}

export type Variables<T extends Model> = {
  target: T
  limit: number
  sortBy: SortBy
  keyword: string
  searchedAt: string
  num: number
}

const useQuerySearch = <T extends Model>(
  variables: Variables<T>,
): SearchResult<T> => {
  const { data, loading, error, refetch } = useSearchQuery({ variables })

  return {
    searchResult: data?.search as SearchResult<T>['searchResult'],
    loading,
    refetch,
    error,
  }
}
export default useQuerySearch
