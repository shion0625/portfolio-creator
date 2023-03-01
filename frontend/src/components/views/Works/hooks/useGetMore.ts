import { useGetWorks } from './useGetWorks'
import { useState, useEffect, useCallback } from 'react'
import { Work, WorkPagination, Model } from '~/models/types'

type Variable = { order: 'update'; searched: string; num: number } | { order: 'create'; searched: string; num: number }

const CURRENT_TIME = new Date().toISOString().replace('T', ' ').replace('Z', '')

let lastData: Work = {
  id: 'first',
  title: 'first',
  created_at: CURRENT_TIME,
  updated_at: CURRENT_TIME,
  is_delete: false,
  number_of_work: 9999,
  user: {
    id: 'first',
  },
}

export const useGetMore = () => {
  const DEFAULT_VOLUMES = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
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
  const [variable, setVariable] = useState<Variable>({ order: 'create', searched: CURRENT_TIME, num: 9999 })

  let { getWorks, error } = useGetWorks()

  useEffect(() => {
    getWorks({
      variables: { limit: DEFAULT_VOLUMES, order: variable.order, searched: variable.searched, num: variable.num },
      onCompleted: (data) => {
        setWorks({
          type: works.type,
          pageInfo: {
            ...works.pageInfo,
            hasNextPage: data.works.pageInfo.hasNextPage,
          },
          nodes: [...works.nodes, ...data.works.nodes],
        })
        if (data.works.nodes.length != 0) {
          lastData = data.works.nodes.slice(-1)[0]
        }
      },
    })
  }, [variable])

  const onScroll = useCallback((): void => {
    console.log(lastData)
    if (lastData) {
      setVariable({ order: 'create', searched: lastData.created_at, num: lastData.number_of_work })
    }
  }, [variable, lastData])

  return { pageInfo: works.pageInfo, works: works.nodes, onScroll }
}
