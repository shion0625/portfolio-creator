import { renderHook } from '@testing-library/react'
import { createRoot } from 'react-dom/client'
import { useInfiniteScroll } from '~/components/screens/InfScroll/hook'

describe('useInfiniteScroll', () => {
  let addEventListenerSpy: any, removeEventListenerSpy: any

  beforeAll(() => {
    jest.useFakeTimers() // setTimeoutをフェイクする
  })

  afterAll(() => {
    jest.runOnlyPendingTimers() // テストが終わったら、フェイクしたsetTimeoutのコールバックを実行する
  })

  beforeEach(() => {
    jest.clearAllMocks() // すべてのモックをリセットする
    addEventListenerSpy = jest.spyOn(window, 'addEventListener').mockImplementation((event, callback) => {
      if (event === 'scroll' && typeof callback === 'function') {
        callback(new Event('scroll')) // trigger scroll event listener immediately
      }
    })
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener').mockImplementation((event, callback) => {})
  })

  it('calls onScroll when scrolled to the bottom', () => {
    const mockOnScroll = jest.fn()
    renderHook(() => useInfiniteScroll(mockOnScroll))

    // スクロールイベントをトリガーし、isLoadingがtrueからfalseに変更され、onScrollが呼び出されたことを確認
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1000, writable: true })
    Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1900, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true })

    window.dispatchEvent(new Event('scroll'))
    jest.runOnlyPendingTimers()

    expect(mockOnScroll).toHaveBeenCalled()
  })

  it('does not call onScroll when isLoading is true', () => {
    const mockOnScroll = jest.fn()
    renderHook(() => useInfiniteScroll(mockOnScroll))

    // isLoadingをtrueに設定し、スクロールイベントが発生してもonScrollが呼び出されないことを確認
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1000, writable: true })
    Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1000, writable: true })
    expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow()
    jest.runOnlyPendingTimers()

    expect(mockOnScroll).not.toHaveBeenCalled()
  })

  it('does not call onScroll when scrollHeight is not greater than 1500', () => {
    const mockOnScroll = jest.fn()
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, writable: true })
    renderHook(() => useInfiniteScroll(mockOnScroll))

    // scrollHeightが1500未満の場合、スクロールイベントが発生してもonScrollが呼び出されないことを確認
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)

    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1000, writable: true })
    Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1000, writable: true })
    expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow()
    jest.runOnlyPendingTimers()

    expect(mockOnScroll).not.toHaveBeenCalled()
  })
})
