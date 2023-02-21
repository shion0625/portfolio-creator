import React, { useState, useEffect, useCallback } from 'react'
import { Work } from '~/models/types'
import { GetWorkNodesQuery, GetWorkNodesDocument } from '~/models/client'
import { useLazyQuery,  } from '@apollo/client';

const useGetWorks = () => {
  const [ getWorks,{ data, loading, error } ]= useLazyQuery<GetWorkNodesQuery>(GetWorkNodesDocument)
  return {getWorks, worksData: data?.workNodes, loading, error}
}

type Last =
  | { order: "update", searched: string, num: number }
  | { order: "create", searched: string, num: number }

  type State =
  | { _tag: "init" }
  | { _tag: "loading" }
  | { _tag: "success", contents: Work[] }

export const useGetMore = () =>
{
  const DEFAULT_VOLUMES = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
  const CURRENT_TIME = new Date().toISOString().replace('T', ' ').replace('Z', '');
  const [works, setWorks] = useState<Work[]>([])
  const [variable, setVariable] = useState<Last>({ order: "create", searched: CURRENT_TIME, num: 9999 })
  let { getWorks, error } = useGetWorks()
  let lastData: Work

  useEffect(() => {
    getWorks({
      variables: { limit: DEFAULT_VOLUMES, order: variable.order, searched: variable.searched, num: variable.num },
      onCompleted: (data) => {
    setWorks((current) => [
      ...current,
      ...data.workNodes])
        lastData = data.workNodes.slice(-1)[0]
      }
    })
  }, [variable])

  const onClick = useCallback((): void => {
    console.log(lastData)
    if (lastData) {
      setVariable({order: "create", searched: lastData.created_at, num: lastData.number_of_work })
    }
  }, [variable])

  return {allData: works, onClick}
}
