import { useSearch, Variables } from './useSearch'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Work, User, WorkPagination,UserPagination, Model, SortBy, Node } from '~/models/types'

type SearchDataState<T extends Model> = (T extends Model.Work ? WorkPagination : UserPagination)

type SearchNodeDataState<T extends Model> = (T extends Model.Work ? Work : User)

type UseFetchSearchWorks<T extends Model> = {
  searchData: SearchDataState<T>
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()

export const useFetchSearchWorks = <T extends Model>(target: T, sortBy: SortBy, keyword: string): UseFetchSearchWorks<T> => {
  const [searchData, setSearchData] = useState<SearchDataState<T>>(() => ({
  type: target,
  pageInfo: {
    count: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    page: 0,
    paginationLength: 0,
    totalCount: 0,
  },
  nodes: [],
}))

  const [variables, setVariable] = useState<Variables<T>>({
    target,
    keyword,
    sortBy,
    searchedAt: CURRENT_TIME,
    num: 9999,
    limit: DEFAULT_VOLUMES,
  })
const lastDataRef = useRef<Node | undefined>(undefined)

  const { search, searchResult } = useSearch(
    variables
  )

  useEffect(() => {
    search({
      variables,
      onCompleted: () => {
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
  }, [variables])


const onScroll = useCallback((): void => {
  const lastData = lastDataRef.current as SearchNodeDataState<T>;
    if (lastData) {
      setVariable((prev) => ({
        ...prev,
        searchedAt: lastData.created_at,
        num: lastData.serial_number,
        limit: DEFAULT_VOLUMES,
      })
      )
    }
  }, [])

  return {
    searchData: searchData,
    onScroll,
  }
}
