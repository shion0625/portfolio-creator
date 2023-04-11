import { render, screen } from '@testing-library/react'
import WorksInfScroll from '~/components/screens/WorksInfScroll'

jest.mock('~/components/parts/WorkImageCard', () => ({
  __esModule: true,
  default: ({ work }: any) => {
    return (
      <div aria-label='WorkImageCard' role='presentation'>
        {work.title}
      </div>
    )
  },
}))

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

describe('WorksInfScroll', () => {
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
      works: [
        {
          id: '1',
          title: 'test work 1',
          created_at: new Date(Date.now()).toISOString(),
          updated_at: new Date(Date.now()).toISOString(),
          is_delete: false,
          serial_number: 1,
          user: {
            id: '1',
            name: 'Test User',
            serial_number: 1,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString(),
          },
        },
      ],
      onScroll: jest.fn(),
    }

    render(<WorksInfScroll {...Props} />)
    const InfScroll = screen.getByLabelText('InfScroll')
    expect(InfScroll).toBeInTheDocument()

    expect(InfScroll.children[0]).toHaveTextContent(Props.works[0].title)
  })
})
