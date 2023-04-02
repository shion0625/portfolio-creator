import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// 追加
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import ProfileMenu from '~/components/parts/ProfileMenu'

// 追加
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}))

describe('ProfileMenu component', () => {
  const props = {
    menuId: 'profile-menu',
    anchorEl: document.createElement('div'),
    isMenuOpen: true,
    handleMenuClose: jest.fn(),
  }

  const session = {
    user: {
      id: 'user-id-1',
    },
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    accessToken: 'test-accessToken',
  }

  it('should render the ProfileMenu component', () => {
    ;(useSession as jest.Mock).mockReturnValue({})
    render(
      <SessionProvider session={null}>
        <ProfileMenu {...props} />
      </SessionProvider>,
    )

    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    const links = screen.getAllByRole('menuitem')
    expect(links).toHaveLength(4)
    expect(links[0]).toHaveTextContent('ホーム')
    expect(links[1]).toHaveTextContent('ユーザ一覧')
    expect(links[2]).toHaveTextContent('作品一覧')
    expect(links[3]).toHaveTextContent('ログイン')
  })

  it('should call handleMenuClose when a menu item is clicked', async () => {
    const handleMenuClose = jest.fn()
    ;(useSession as jest.Mock).mockReturnValue({})

    render(
      <SessionProvider session={session}>
        <ProfileMenu {...props} handleMenuClose={handleMenuClose} />
      </SessionProvider>,
    )

    const link = screen.getByText('ホーム')
    await userEvent.click(link)

    expect(handleMenuClose).toHaveBeenCalledTimes(1)
  })

  it('should render the correct menu items when the user is logged in', () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: session })
    render(
      <SessionProvider session={session}>
        <ProfileMenu {...props} />
      </SessionProvider>,
    )

    const links = screen.getAllByRole('menuitem')
    expect(links).toHaveLength(5)
    expect(links[3]).toHaveTextContent('ポートフォリオ編集')
    expect(links[4]).toHaveTextContent('ログアウト')
  })

  it('should call handleMenuClose when a menu item is clicked when the user is logged in', async () => {
    const handleMenuClose = jest.fn()
    ;(useSession as jest.Mock).mockReturnValue({ data: session })

    render(
      <SessionProvider session={session}>
        <ProfileMenu {...props} handleMenuClose={handleMenuClose} />
      </SessionProvider>,
    )

    const link = screen.getByText('ホーム')
    await userEvent.click(link)

    expect(handleMenuClose).toHaveBeenCalledTimes(1)
  })
})
