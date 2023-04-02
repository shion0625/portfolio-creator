import { render, screen } from '@testing-library/react'
import React from 'react'
import LinkMenuItem from '~/components/parts/LinkMenuItem'

describe('LinkMenuItem', () => {
  const menuName = 'menu name'
  const href = '/path/to/link'
  const onClick = jest.fn()

  it('renders the menu item with the provided props', () => {
    render(<LinkMenuItem href={href} menuName={menuName} onClick={onClick} />)
    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).toHaveTextContent(menuName)
    expect(menuItem).toHaveAttribute('href', href)
  })

  it('calls the onClick callback when the menu item is clicked', async () => {
    render(<LinkMenuItem href={href} menuName={menuName} onClick={onClick} />)
    const menuItem = screen.getByRole('menuitem')
    menuItem.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
