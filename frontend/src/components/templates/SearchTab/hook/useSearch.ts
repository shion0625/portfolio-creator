import { useLazyQuery, LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'
import { WorkPagination, UserPagination, Model, SortBy } from '~/models/types'

export interface SearchResult<T extends Model> {
  search: LazyQueryExecFunction<SearchQuery, OperationVariables>
  searchData: (T extends Model.Work ? WorkPagination : UserPagination)|undefined
}

export const useSearch = <T extends Model>(
  target: T,
  keyword: string,
  sortBy: SortBy,
  searchedAt: string,
  num: number,
  limit: number,
): SearchResult<T> => {
  const [search, { data, loading, error }] = useLazyQuery<SearchQuery>(SearchDocument, {
    variables: {
      target,
      keyword,
      sortBy,
      searchedAt,
      num,
      limit,
    },
  })

  return {
    search,
    searchData: data?.search as SearchResult<T>['searchData'],
  }
}
