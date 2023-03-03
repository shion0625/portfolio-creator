import { useSearch, SearchResult } from './useSearch'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Work, WorkPagination, Model, SortBy } from '~/models/types'

type GetWorksParams = {
  variables: {
    limit: number
    sortBy: SortBy
    keyword: string
    searchedAt: string
    num: number
  }
  onCompleted: (data: { search: WorkPagination }) => void
}

type UseGetMoreResult = {
  pageInfo: WorkPagination['pageInfo']
  works: WorkPagination['nodes']
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()

export const useFetchSearchWorks = (sortBy: SortBy, keyword: string): UseGetMoreResult => {
  const [works, setWorks] = useState<WorkPagination>({
    type: Model.Work,
    pageInfo: {
      count: 0,
      hasNextPage: true,
      hasPreviousPage: false,
      page: 0,
      paginationLength: 0,
      totalCount: 0,
    },
    nodes: [],
  })
  const [variable, setVariable] = useState<GetWorksParams['variables']>({
    keyword,
    sortBy,
    searchedAt: CURRENT_TIME,
    num: 9999,
    limit: DEFAULT_VOLUMES,
  })
  const lastDataRef = useRef<Work | undefined>(undefined)

  const { search, searchData } = useSearch(
    Model.Work,
    keyword,
    SortBy.Create,
    '2023-02-23 02:30:46.510146',
    9999,
    DEFAULT_VOLUMES,
  )

  useEffect(() => {
    search({
      variables: { ...variable },
      onCompleted: () => {
        if (searchData) {
          setWorks((prev) => ({
            ...prev,
            pageInfo: {
              ...prev.pageInfo,
              hasNextPage: searchData.pageInfo.hasNextPage ?? prev.pageInfo.hasNextPage,
            },
            nodes: [...prev.nodes, ...searchData.nodes],
          }))
          if (searchData.nodes.length !== 0) {
            lastDataRef.current = searchData.nodes[searchData.nodes.length - 1]
          }
        }
      },
    })
  }, [search, variable, searchData])

  const onScroll = useCallback((): void => {
    const lastData = lastDataRef.current
    if (lastData) {
      setVariable({
        sortBy,
        searchedAt: lastData.created_at,
        keyword,
        num: lastData.number_of_work,
        limit: DEFAULT_VOLUMES,
      })
    }
  }, [])

  return {
    pageInfo: works.pageInfo,
    works: works.nodes,
    onScroll,
  }
}
