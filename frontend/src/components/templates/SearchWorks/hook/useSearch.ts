import { useLazyQuery, LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'
import { WorkPagination, UserPagination, Model, SortBy } from '~/models/types'

export interface SearchResult<T extends Model> {
  search: LazyQueryExecFunction<SearchQuery, OperationVariables>
  searchResult: (T extends Model.Work ? WorkPagination : UserPagination) | undefined
}

export type Variables<T extends Model>  = {
  target: T,
  limit: number
  sortBy: SortBy
  keyword: string
  searchedAt: string
  num: number
}

export const useSearch = <T extends Model>(
  variables: Variables<T>
): SearchResult<T> => {
  const [search, { data, loading, error }] = useLazyQuery<SearchQuery>(SearchDocument, {
    variables: variables
  })

  return {
    search,
    searchResult: data?.search as SearchResult<T>['searchResult'],
  }
}
