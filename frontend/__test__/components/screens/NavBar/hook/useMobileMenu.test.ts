import { renderHook, act } from '@testing-library/react'
import { useMobileMenu } from '~/components/screens/NavBar/hooks'

describe('useMobileMenu', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useMobileMenu())

    expect(result.current.mobileMoreAnchorEl).toBeNull()
    expect(result.current.isMobileMenuOpen).toBe(false)
  })

  it('should handle mobile menu open and close', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.handleMobileMenuOpen({ currentTarget: {} } as any)
    })

    expect(result.current.mobileMoreAnchorEl).not.toBeNull()
    expect(result.current.isMobileMenuOpen).toBe(true)

    act(() => {
      result.current.handleMobileMenuClose()
    })

    expect(result.current.mobileMoreAnchorEl).toBeNull()
    expect(result.current.isMobileMenuOpen).toBe(false)
  })
})
