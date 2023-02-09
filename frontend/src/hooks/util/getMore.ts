import React, { useState, useEffect, useCallback } from 'react'
import { useGetWorks } from '~/hooks/Work/query'
import { Work } from '~/models/types'

type State =
  | { _tag: "init" }
  | { _tag: "loading" }
  | { _tag: "success", contents: Work[]}

export const useGetMore = () =>
{
  const defaultVolumes = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)
  const limit = 20
  const [works, setWorks] = useState<Work[]>([])
  const [status, setStatus] = useState<State>({ _tag: "init" });
  const [offset, setOffset] = useState(defaultVolumes)
  const { getWorks, worksData, loading, error } = useGetWorks()

  useEffect(() => {
    if (status._tag === "success") {
    setWorks((current) => [...current, ...status.contents])
    }
  }, [status])

  useEffect(() => {
    getWorks({ variables: { offset, limit } })
    if (!loading && worksData) {
      setStatus({
      _tag: "success",
      contents: worksData
    })
    }

  }, [offset, loading])


  const onClick = useCallback(() => {
    setOffset(offset + limit)
  }, [offset])

  return {data: works, status, onClick}
}
