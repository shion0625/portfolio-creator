import React, { useState, useEffect, useCallback } from 'react'
import { useGetWorks } from '~/hooks/Work/query'
import { GetWorksQuery } from '~/models/client'
const useGetMore = () => {
  const [works, setWorks] = useState<GetWorksQuery>()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const { data, loading, error } = useGetWorks(offset, 20)
    setWorks(data)
  }, [offset])
  const defaultVolumes = Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES)

  const onClick = useCallback(() => {
    setOffset(offset + defaultVolumes)
  }, [offset])

  return {onClick, works}
}
