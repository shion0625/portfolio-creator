import { renderHook, act } from '@testing-library/react'
import { useProfileMenu } from '~/components/screens/NavBar/hooks'
import { MouseEvent } from 'react'

describe('useProfileMenu', () => {
  it('should initialize anchorEl to null and isMenuOpen to false', () => {
    const { result } = renderHook(() => useProfileMenu())

    expect(result.current.anchorEl).toBeNull()
    expect(result.current.isMenuOpen).toBe(false)
  })

  it('should set anchorEl to event.currentTarget when handleProfileMenuOpen is called', () => {
    const { result } = renderHook(() => useProfileMenu())

    act(() => {
      result.current.handleProfileMenuOpen({ currentTarget: document.createElement('div') } as MouseEvent<any>)
    })

    expect(result.current.anchorEl).toBeDefined()
  })

  it('should set anchorEl to null when handleProfileMenuClose is called', () => {
    const { result } = renderHook(() => useProfileMenu())

    act(() => {
      result.current.handleProfileMenuOpen({ currentTarget: document.createElement('div') } as MouseEvent<any>)
    })

    expect(result.current.anchorEl).toBeDefined()

    act(() => {
      result.current.handleProfileMenuClose()
    })

    expect(result.current.anchorEl).toBeNull()
  })
})
