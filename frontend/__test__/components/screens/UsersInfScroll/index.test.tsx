import { render, screen } from '@testing-library/react'
import UsersInfScroll from '~/components/screens/UsersInfScroll'

jest.mock('~/components/screens/InfScroll', () => ({
  __esModule: true,
  default: ({ renderItem }: any) => {
    const children = renderItem()
    return (
      <div aria-label='InfScroll' role='presentation'>
        {children}
      </div>
    )
  },
}))

jest.mock('~/components/parts/UserCard', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='UserCard' role='presentation'>
        UserCard
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

    expect(screen.getByLabelText('InfScroll')).toBeInTheDocument()
  })
})
