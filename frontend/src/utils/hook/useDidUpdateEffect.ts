import { useRef, useEffect, EffectCallback, DependencyList } from 'react'

// 初回の実行がスキップされるuseEffect
export function useDidUpdateEffect(fn: EffectCallback, deps: DependencyList) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
    } else {
      fn()
    }
  }, [fn, deps])
}
