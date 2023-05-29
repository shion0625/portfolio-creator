import { render, renderHook } from '@testing-library/react'
import React from 'react'
import { useDidUpdateEffect } from '~/utils/hooks/useDidUpdateEffect'

describe('useDidUpdateEffect', () => {
  it('should skip first effect run', () => {
    const effectCallback = jest.fn()
    const { rerender } = render(<TestComponent effectCallback={effectCallback} dependencyValue={1} />)
    expect(effectCallback).not.toHaveBeenCalled()

    rerender(<TestComponent effectCallback={effectCallback} dependencyValue={2} />)
    expect(effectCallback).toHaveBeenCalledTimes(1)
  })

  it('should call the effect function on update', () => {
    const effectFn = jest.fn()
    const deps = ['dependency']

    const { rerender } = renderHook(({ deps }) => useDidUpdateEffect(effectFn, deps), {
      initialProps: { deps },
    })

    expect(effectFn).not.toHaveBeenCalled()

    const newDeps = [...deps, 'newDependency']

    rerender({ deps: newDeps })

    expect(effectFn).toHaveBeenCalled()
  })
})

type TestComponentProps = {
  effectCallback: () => void
  dependencyValue: number
}

const TestComponent: React.FC<TestComponentProps> = ({ effectCallback, dependencyValue }) => {
  useDidUpdateEffect(effectCallback, [dependencyValue])
  return null
}
