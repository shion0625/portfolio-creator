import { useQuery } from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'
import { ModelPagination , WorkPagination, UserPagination, Model} from '~/models/types'

export const useSearch = (target: Model, keyword: string, limit: number, searched: string, num: number) => {
  const { data, loading, error } = useQuery<SearchQuery>(SearchDocument, {
    variables: {
      target: target,
      keyword: keyword,
      limit: limit,
      searched: "2023-02-23 02:30:46.510146",
      num: 9999
    }
  })

  const isWork = (searchResult: ModelPagination): searchResult is WorkPagination => {
  return (searchResult as WorkPagination).type == Model.Work;
  }

  const isUser = (searchResult: ModelPagination): searchResult is UserPagination => {
  return (searchResult as UserPagination).type == Model.User;
  }

  return { search: data?.search, isWork, isUser }
}
