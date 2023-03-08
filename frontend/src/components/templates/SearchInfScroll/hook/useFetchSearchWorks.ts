import { useSearch, Variables, SearchDataState } from './useSearch'
import { useState, useCallback, useRef } from 'react'
import { Work, User, Model, SortBy, Node } from '~/models/types'
import { useDidUpdateEffect } from '~/utils/hook/useDidUpdateEffect'

type SearchNodeDataState<T extends Model> = T extends Model.Work ? Work : User

type UseFetchSearchWorks<T extends Model> = {
  searchData: SearchDataState<T>
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()
const INIT_SEARCH_DATA = {
  pageInfo: {
    count: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    page: 0,
    paginationLength: 0,
    totalCount: 0,
  },
  nodes: [],
}

export const useFetchSearchWorks = <T extends Model>(
  target: T,
  sortBy: SortBy,
  keyword: string,
): UseFetchSearchWorks<T> => {
  //初期データ
  const [searchData, setSearchData] = useState<SearchDataState<T>>(() => ({
    type: target,
    ...INIT_SEARCH_DATA,
  }))

  //初期のuseSearchの引数
  const [variables, setVariable] = useState<Variables<T>>({
    target,
    keyword,
    sortBy,
    searchedAt: CURRENT_TIME,
    num: 9999,
    limit: DEFAULT_VOLUMES,
  })
  //カーソルスクロール使用するための最後のデータ
  const lastDataRef = useRef<Node | undefined>(undefined)

  const { refetch } = useSearch(variables, setSearchData, lastDataRef)

  //keywordが変更になった際にデータを
  useDidUpdateEffect(() => {
    //searchDataを初期値に変更
    setSearchData((prev) => ({
      ...prev,
      ...INIT_SEARCH_DATA,
    }))
    //variableを初期値に変更
    setVariable((prev) => ({
      ...prev,
      keyword,
      searchedAt: CURRENT_TIME,
      num: 9999,
    }))
  }, [keyword])

  //variablesが変更になった時だけrefetchが発火する
  useDidUpdateEffect(() => {
    //variablesを変更した後に発火し、更新された変数でデータの取得
    refetch(variables)
  }, [variables])

  //lastDataRef.currentをvariablesに渡す。
  const onScroll = useCallback((): void => {
    const lastData = lastDataRef.current as SearchNodeDataState<T>
    if (lastData) {
      setVariable((prev) => ({
        ...prev,
        searchedAt: lastData.created_at,
        num: lastData.serial_number,
      }))
    }
  }, [])

  return {
    searchData: searchData,
    onScroll,
  }
}
