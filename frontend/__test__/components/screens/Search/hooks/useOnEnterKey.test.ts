import { renderHook, act } from '@testing-library/react'
import { useOnEnterKey } from '~/components/screens/Search/hooks'

describe('useOnEnterKey', () => {
  it('should call the provided function when "Enter" is pressed', () => {
    const func = jest.fn()
    const { result } = renderHook(() => useOnEnterKey(func))
    const event: any = new KeyboardEvent('keydown', { key: 'Enter' })
    result.current.onEnterKey(event)
    expect(func).toHaveBeenCalled()
  })
  it('should not call the provided function when "Enter" is pressed during composition', () => {
    const func = jest.fn()
    const { result } = renderHook(() => useOnEnterKey<HTMLInputElement>(func))
    const event: any = new KeyboardEvent('keydown', { key: 'Enter' })

    act(() => {
      result.current.startComposition()
    })
    result.current.onEnterKey(event)
    expect(func).not.toHaveBeenCalled()

    act(() => {
      result.current.endComposition()
    })
    result.current.onEnterKey(event)
    expect(func).toHaveBeenCalled()
  })
})
