import { render, screen } from '@testing-library/react'
import { UserList } from '~/components/screens/UserList'
import { User } from '~/models/types'

jest.mock('~/components/parts/Link', () => {
  return {
    __esModule: true,
    default: ({ linkProps, children, target, rel }: any) => {
      return (
        <a href={linkProps.href} aria-label='url' target={target} rel={rel}>
          {children}
        </a>
      )
    },
  }
})

describe('UserList', () => {
  const users: User[] = [
    {
      id: '1',
      name: 'user1',
      serial_number: 1,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
    {
      id: '2',
      name: 'user2',
      serial_number: 2,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
    {
      id: '3',
      serial_number: 3,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders list of users', () => {
    render(<UserList users={users} />)

    // Linkコンポーネントに正しいhrefが渡されているかを確認する
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(users.length)
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/users/${users[index].id}`)
    })

    // Paperコンポーネントが正しいテキストを表示しているかを確認する
    const papers = screen.getAllByRole('presentation')
    expect(papers).toHaveLength(users.length)

    papers.forEach((paper, index) => {
      const expectedText = users[index].name ?? '名無しさん'
      expect(paper).toHaveTextContent(expectedText)
    })
  })
})
