import { useState, useEffect, useCallback } from 'react'
import { Work, PaginationInfo } from '~/models/types'
import { useGetWorks } from './useGetWorks'

type Variable = { order: 'update'; searched: string; num: number } | { order: 'create'; searched: string; num: number }

type Works = PaginationInfo & {
  contents: Work[]
}
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
  const [works, setWorks] = useState<Works>({
    count: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    page: 0,
    paginationLength: 0,
    totalCount: 0,
    contents: [],
  })
  const [variable, setVariable] = useState<Variable>({ order: 'create', searched: CURRENT_TIME, num: 9999 })

  let { getWorks, error } = useGetWorks()

  useEffect(() => {
    getWorks({
      variables: { limit: DEFAULT_VOLUMES, order: variable.order, searched: variable.searched, num: variable.num },
      onCompleted: (data) => {
        setWorks({
          ...works,
          hasNextPage: data.works.pageInfo.hasNextPage,
          contents: [...works.contents, ...data.works.nodes],
        })
        if (data.works.nodes.length != 0) {
          lastData = data.works.nodes.slice(-1)[0]
        }
      },
    })
  }, [variable])

  const onClick = useCallback((): void => {
    console.log(lastData)
    if (lastData) {
      setVariable({ order: 'create', searched: lastData.created_at, num: lastData.number_of_work })
    }
  }, [variable, lastData])

  return { works: works, onClick }
}