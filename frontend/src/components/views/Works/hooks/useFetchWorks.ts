import useQueryWorks, { Variables } from './useQueryWorks'
import { useState, useCallback, useRef } from 'react'
import { WorkPagination, Work, Model, SortBy, Node } from '~/models/types'
import { useDidUpdateEffect } from '~/utils/hooks/useDidUpdateEffect'

type UseFetchSearchWorks = {
  fetchData: WorkPagination
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()
const INIT_WORKS_DATA = {
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

export const useFetchWorks = (sortBy: SortBy): UseFetchSearchWorks => {
  //初期データ
  const [fetchData, setFetchData] = useState<WorkPagination>(() => ({
    type: Model.Work,
    ...INIT_WORKS_DATA,
  }))

  //初期のuseSearchの引数
  const [variables, setVariable] = useState<Variables>({
    sortBy,
    searchedAt: CURRENT_TIME,
    num: 9999,
    limit: DEFAULT_VOLUMES,
  })
  //カーソルスクロール使用するための最後のデータ
  const lastDataRef = useRef<Node | undefined>(undefined)

  const { refetch } = useQueryWorks(variables, setFetchData, lastDataRef)

  //variablesが変更になった時だけrefetchが発火する
  useDidUpdateEffect(() => {
    //variablesを変更した後に発火し、更新された変数でデータの取得
    refetch(variables)
  }, [variables])

  //lastDataRef.currentをvariablesに渡す。
  const onScroll = useCallback((): void => {
    const lastData = lastDataRef.current as Work
    if (lastData) {
      setVariable((prev) => ({
        ...prev,
        searchedAt: lastData.created_at,
        num: lastData.serial_number,
      }))
    }
  }, [])

  return {
    fetchData: fetchData,
    onScroll,
  }
}
