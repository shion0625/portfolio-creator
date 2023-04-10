import { render, fireEvent, screen } from '@testing-library/react'
import NavBar from '~/components/screens/NavBar'
import * as hooks from '~/components/screens/NavBar/hooks'

jest.mock('~/components/screens/Search', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('~/components/parts/ProfileMenu', () => ({
  __esModule: true,
  default: ({handleMenuClose}:any) => {
    return (
      <div aria-label='ProfileMenu' role='presentation' onClick={handleMenuClose}>
        ProfileMenu
      </div>
    )
  },
}))

jest.mock('~/components/parts/MobileMenu', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='MobileMenu' role='presentation'>
        MobileMenu
      </div>
    )
  },
}))

jest.mock('~/components/parts/PaletteModeButton', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='PaletteModeButton' role='presentation'>
        PaletteModeButton
      </div>
    )
  },
}))

// hooks.tsをモック化
jest.mock('~/components/screens/NavBar/hooks')

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(hooks.useProfileMenu as jest.Mock).mockImplementation(() => ({
        isMenuOpen: false,
        anchorEl: null,
        handleProfileMenuOpen: jest.fn(),
        handleProfileMenuClose: jest.fn(),
    }))
    ;(hooks.useMobileMenu as jest.Mock).mockImplementation(() => ({
      isMobileMenuOpen: false,
      mobileMoreAnchorEl: null,
      handleMobileMenuOpen: jest.fn(),
      handleMobileMenuClose: jest.fn(),
    }))
  })

  it('profile menu button can click', () => {
    const handleProfileMenuOpenMock = jest.fn()
    const handleProfileMenuCloseMock = jest.fn()
    ;(hooks.useProfileMenu as jest.Mock).mockImplementation(() => ({
      isMenuOpen: false,
      anchorEl: null,
      handleProfileMenuOpen: handleProfileMenuOpenMock,
      handleProfileMenuClose: handleProfileMenuCloseMock,
    }))

    render(<NavBar />)

    fireEvent.click(screen.getByLabelText('account of current user'))
    expect(handleProfileMenuOpenMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('ProfileMenu'))
    expect(handleProfileMenuCloseMock).toHaveBeenCalledTimes(1)


  })

  it('mobile menu button can click', () => {
    const handleMobileMenuOpenMock = jest.fn()
    const handleMobileMenuCloseMock = jest.fn()
    ;(hooks.useMobileMenu as jest.Mock).mockImplementation(() => ({
      isMobileMenuOpen: false,
      mobileMoreAnchorEl: null,
      handleMobileMenuOpen: handleMobileMenuOpenMock,
      handleMobileMenuClose: handleMobileMenuCloseMock,
    }))

    render(<NavBar />)

    fireEvent.click(screen.getByLabelText('mobile show more'))
    expect(handleMobileMenuOpenMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('ProfileMenu'))
    expect(handleMobileMenuCloseMock).toHaveBeenCalledTimes(1)
  })
})
