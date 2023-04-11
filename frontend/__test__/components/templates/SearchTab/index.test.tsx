import { render, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import { RecoilRoot } from 'recoil'
import SearchTab from '~/components/templates/SearchTab'
import { currentTabState } from '~/stores/CurrentTab'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('~/components/templates/SearchInfScroll/Users', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='SearchInfScroll' role='tab'>
        SearchInfScrollUsers
      </div>
    )
  },
}))
jest.mock('~/components/templates/SearchInfScroll/Works', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='SearchInfScroll' role='tab'>
        SearchInfScrollWorks
      </div>
    )
  },
}))

describe('SearchTab', () => {
  const mockRouter = {
    query: {
      target: 'users',
    },
    isReady: true,
  }
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('should render the loading message while the component is not ready', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: {
        target: '',
      },
      isReady: false,
    })
    const { getByText } = render(
      <RecoilRoot>
        <SearchTab />
      </RecoilRoot>,
    )

    expect(getByText('loading...')).toBeInTheDocument()
  })

  it('should render the tab panel with users and the search component for users when the users tab is active', () => {
    const { getByText, queryByText } = render(
      <RecoilRoot>
        <SearchTab />
      </RecoilRoot>,
    )

    expect(getByText('users')).toBeInTheDocument()
    expect(getByText('works')).toBeInTheDocument()
    expect(getByText('SearchInfScrollUsers')).toBeInTheDocument()
    expect(queryByText('SearchInfScrollWorks')).not.toBeInTheDocument()
  })

  it('should render the tab panel with works and the search component for works when the works tab is active', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      query: {
        target: 'works',
      },
      isReady: true,
    })
    const { getByText, queryByText } = render(
      <RecoilRoot>
        <SearchTab />
      </RecoilRoot>,
    )

    expect(getByText('users')).toBeInTheDocument()
    expect(getByText('works')).toBeInTheDocument()
    expect(getByText('SearchInfScrollWorks')).toBeInTheDocument()
    expect(queryByText('SearchInfScrollUsers')).not.toBeInTheDocument()
  })

  it('should switch between the users and works tabs and update the current tab state', () => {
    const { getByText, queryByText } = render(
      <RecoilRoot>
        <SearchTab />
      </RecoilRoot>,
    )

    fireEvent.click(getByText('works'))

    expect(getByText('SearchInfScrollWorks')).toBeInTheDocument()
    expect(queryByText('SearchInfScrollUsers')).not.toBeInTheDocument()
  })
})
