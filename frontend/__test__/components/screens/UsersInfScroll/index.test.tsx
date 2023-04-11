import { render, screen } from '@testing-library/react'
import UsersInfScroll from '~/components/screens/UsersInfScroll'

jest.mock('~/components/screens/InfScroll', () => ({
  __esModule: true,
  default: ({ renderItem, items }: any) => {
    const children = renderItem(items[0])
    return (
      <div aria-label='InfScroll' role='presentation'>
        {children}
      </div>
    )
  },
}))

jest.mock('~/components/parts/UserCard', () => ({
  __esModule: true,
  default: ({user}: any) => {
    return (
      <div aria-label='UserCard' role='presentation'>
        {user.name}
      </div>
    )
  },
}))

describe('UsersInfScroll', () => {
  it('renders InfScroll component with correct props', () => {
    const Props = {
      pageInfo: {
        count: 1,
        hasPreviousPage: true,
        page: 1,
        paginationLength: 1,
        totalCount: 1,
        hasNextPage: true,
      },
      users: [
        {
          id: '1',
          name: 'test user 1',
          created_at: new Date(Date.now()).toISOString(),
          updated_at: new Date(Date.now()).toISOString(),
          serial_number: 1,
        },
        {
          id: '2',
          name: 'test user 2',
          created_at: new Date(Date.now()).toISOString(),
          updated_at: new Date(Date.now()).toISOString(),
          serial_number: 2,
        },
      ],
      onScroll: jest.fn(),
    }

    render(<UsersInfScroll {...Props} />)

    const InfScroll = screen.getByLabelText('InfScroll')
    expect(InfScroll).toBeInTheDocument()

      expect(InfScroll.children[0]).toHaveTextContent(Props.users[0].name)
  })
})
