import { useSearch, Variables, SearchDataState } from './useSearch'
import { last } from 'lodash'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Work, User, WorkPagination, UserPagination, Model, SortBy, Node } from '~/models/types'
import { useDidUpdateEffect } from '~/utils/hook/useDidUpdateEffect'

type SearchNodeDataState<T extends Model> = T extends Model.Work ? Work : User

type UseFetchSearchWorks<T extends Model> = {
  searchData: SearchDataState<T>
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()

export const useFetchSearchWorks = <T extends Model>(
  target: T,
  sortBy: SortBy,
  keyword: string,
): UseFetchSearchWorks<T> => {
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
    limit: 20,
  })
  const lastDataRef = useRef<Node | undefined>(undefined)

  const { searchResult, refetch } = useSearch(variables, setSearchData, lastDataRef)

  useDidUpdateEffect(() => {
    refetch({ variables })
  }, [variables])

  const onScroll = useCallback((): void => {
    const lastData = lastDataRef.current as SearchNodeDataState<T>
    console.log(lastData)
    if (lastData) {
      setVariable((prev) => ({
        ...prev,
        searchedAt: lastData.created_at,
        num: lastData.serial_number,
        limit: DEFAULT_VOLUMES,
      }))
    }
  }, [])

  return {
    searchData: searchData,
    onScroll,
  }
}
