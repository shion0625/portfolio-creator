import { useGetWorks } from './useGetWorks'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Work, WorkPagination, Model } from '~/models/types'

type GetWorksParams = {
  variables: {
    limit: number
    order: 'update' | 'create'
    searched: string
    num: number
  }
  onCompleted: (data: { works: WorkPagination }) => void
}

type UseGetMoreResult = {
  pageInfo: WorkPagination['pageInfo']
  works: WorkPagination['nodes']
  onScroll: () => void
}

const DEFAULT_VOLUMES: number = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
const CURRENT_TIME: string = new Date().toISOString()

export const useFetchWorks = (): UseGetMoreResult => {
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
    order: 'create',
    searched: CURRENT_TIME,
    num: 9999,
    limit: DEFAULT_VOLUMES,
  })
  const lastDataRef = useRef<Work | undefined>(undefined)

  const { getWorks, error } = useGetWorks()

  useEffect(() => {
    getWorks({
      variables: { ...variable },
      onCompleted: (data) => {
        setWorks((prev) => ({
          ...prev,
          pageInfo: {
            ...prev.pageInfo,
            hasNextPage: data.works.pageInfo.hasNextPage,
          },
          nodes: [...prev.nodes, ...data.works.nodes],
        }))
        if (data.works.nodes.length !== 0) {
          lastDataRef.current = data.works.nodes.slice(-1)[0]
        }
      },
    })
  }, [getWorks, variable])

  const onScroll = useCallback((): void => {
    const lastData = lastDataRef.current
    if (lastData) {
      setVariable({
        order: 'create',
        searched: lastData.created_at,
        num: lastData.number_of_work,
        limit: DEFAULT_VOLUMES,
      })
    }
  }, [])

  return { pageInfo: works.pageInfo, works: works.nodes, onScroll }
}
