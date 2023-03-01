import { useQuery } from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'
import { WorkPagination, UserPagination, Model } from '~/models/types'

interface SearchResult<T extends Model> {
  search: (T extends Model.Work ? WorkPagination : UserPagination) | undefined
}

export const useSearch = <T extends Model>(
  target: T,
  keyword: string,
  limit: number,
  searched: string,
  num: number,
): SearchResult<T> => {
  const { data, loading, error } = useQuery<SearchQuery>(SearchDocument, {
    variables: {
      target,
      keyword,
      limit,
      searched,
      num,
    },
  })

  return {
    search: data?.search as SearchResult<T>['search'],
  }
}
