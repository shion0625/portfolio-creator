import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect, useCallback } from 'react'
import { GetWorksQuery, GetWorksDocument } from '~/models/client'
import { Work, PaginationInfo } from '~/models/types'

const useGetWorks = () => {
  const [getWorks, { data, loading, error }] = useLazyQuery<GetWorksQuery>(GetWorksDocument)
  return { getWorks, worksData: data?.works.nodes, loading, error }
}

type Last = { order: 'update'; searched: string; num: number } | { order: 'create'; searched: string; num: number }

type Works = PaginationInfo & {
  contents: Work[]
}

export const useGetMore = () => {
  const DEFAULT_VOLUMES = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
  const CURRENT_TIME = new Date().toISOString().replace('T', ' ').replace('Z', '')
  const [works, setWorks] = useState<Works>({
    count: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    page: 0,
    paginationLength: 0,
    totalCount: 0,
    contents: [],
  })
  const [variable, setVariable] = useState<Last>({ order: 'create', searched: CURRENT_TIME, num: 9999 })
  let { getWorks, error } = useGetWorks()
  let lastData: Work

  useEffect(() => {
    getWorks({
      variables: { limit: DEFAULT_VOLUMES, order: variable.order, searched: variable.searched, num: variable.num },
      onCompleted: (data) => {
        setWorks({
          ...works,
          hasNextPage: data.works.pageInfo.hasNextPage,
          contents: [...works.contents, ...data.works.nodes],
        })
        lastData = data.works.nodes.slice(-1)[0]
      },
    })
  }, [variable])

  const onClick = useCallback((): void => {
    if (lastData) {
      setVariable({ order: 'create', searched: lastData.created_at, num: lastData.number_of_work })
    }
  }, [variable])

  return { works: works, onClick }
}
