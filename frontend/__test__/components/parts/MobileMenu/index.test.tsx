import { render, screen, fireEvent } from '@testing-library/react'
import MobileMenu from '~/components/parts/MobileMenu'

describe('MobileMenu', () => {
  const props = {
    mobileMenuId: 'mobile-menu',
    mobileMoreAnchorEl: document.createElement('div'),
    isMobileMenuOpen: true,
    handleProfileMenuOpen: jest.fn(),
    handleMobileMenuClose: jest.fn(),
  }

  it('should render the MobileMenu component', () => {
    render(<MobileMenu {...props} />)
    const menu = screen.getByRole('menu')
    const menuItems = screen.getAllByRole('menuitem')
    const icons = screen.getAllByRole('button')

    expect(menu).toBeInTheDocument()
    expect(menuItems).toHaveLength(3)
    expect(icons).toHaveLength(3)
  })

  it('should open and close the MobileMenu component (keydown Tab)', () => {
    const handleMobileMenuClose = jest.fn()
    render(<MobileMenu {...props} handleMobileMenuClose={handleMobileMenuClose} />)
    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Tab' })

    expect(handleMobileMenuClose).toHaveBeenCalled()
  })

  it('should open and close the MobileMenu component (keydown Escape)', () => {
    const handleMobileMenuClose = jest.fn()
    render(<MobileMenu {...props} handleMobileMenuClose={handleMobileMenuClose} />)
    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })

    expect(handleMobileMenuClose).toHaveBeenCalled()
  })

  it('should call handleProfileMenuOpen when Profile button is clicked', () => {
    render(<MobileMenu {...props} />)
    const profileButton = screen.getByLabelText('account of current user')
    fireEvent.click(profileButton)
    expect(props.handleProfileMenuOpen).toHaveBeenCalled()
  })
})
