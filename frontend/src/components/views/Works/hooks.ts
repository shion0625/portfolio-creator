import React, { useState, useEffect, useCallback } from 'react'
import { Work } from '~/models/types'
import { GetWorkNodesQuery, GetWorkNodesDocument } from '~/models/client'
import { useLazyQuery } from '@apollo/client';

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
  const [last, setLast] = useState<Last>({ order: "create", searched: CURRENT_TIME, num: 9999 })
  const [status, setStatus] = useState<State>({ _tag: "init" });
  let { getWorks, error } = useGetWorks()
  let keepData: Work

  useEffect(() => {
    if (status._tag === "success") {
    setWorks((current) => [
      ...current,
      ...status.contents])
    }
    setStatus({_tag: "loading"})
    getWorks({
      variables: { limit: DEFAULT_VOLUMES, order: last.order, searched: last.searched, num: last.num },
      onCompleted: (data) => {
        setStatus({
          _tag: "success",
          contents: data.workNodes
        })
        keepData = data.workNodes.slice(-1)[0]
      }
    })
  }, [last])

  const onClick = useCallback((): void => {
    if (keepData) {
      setLast({order: "create", searched: keepData.created_at, num: keepData.number_of_work })
    }
  }, [last])

  return {staticData: works, status, onClick}
}
