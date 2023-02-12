import React, { useState, useEffect, useCallback } from 'react'
import { Work } from '~/models/types'
import { GetWorkNodesQuery, GetWorkNodesDocument } from '~/models/client'
import { useLazyQuery } from '@apollo/client';

const useGetWorks = () => {
  const [ getWorks,{ data, loading, error } ]= useLazyQuery<GetWorkNodesQuery>(GetWorkNodesDocument)
  return {getWorks, worksData: data?.workNodes, loading, error}
}

type State =
  | { _tag: "init" }
  | { _tag: "loading" }
  | { _tag: "success", contents: Work[]}

export const useGetMore = () =>
{
  const DEFAULT_VOLUMES = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
  const [works, setWorks] = useState<Work[]>([])
  const [status, setStatus] = useState<State>({ _tag: "init" });
  const [offset, setOffset] = useState(0)
  let { getWorks, error } = useGetWorks()

  useEffect(() => {
    if (status._tag === "success") {
      setWorks((current) => [
        ...current,
        ...status.contents])
    }
    setStatus({ _tag: "loading" });
    getWorks({
      variables: { offset, limit: DEFAULT_VOLUMES },
      onCompleted: (data) => {
        setStatus({
          _tag: "success",
          contents: data.workNodes
        })
      }
    })
  }, [offset])


  const onClick = useCallback(() => {
    setOffset(offset + DEFAULT_VOLUMES)
  }, [offset])

  return {staticData: works, status, onClick}
}
