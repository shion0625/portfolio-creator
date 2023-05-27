import { render } from '@testing-library/react'
import React from 'react'
import SearchInfScrollWorks from '~/components/templates/SearchInfScroll/Works'
import * as hooks from '~/components/templates/SearchInfScroll/hook'
import { Model } from '~/models/types'

jest.mock('~/components/screens/WorksInfScroll', () => ({
  __esModule: true,
  default: () => {
    return (
      <div aria-label='WorksInfScroll' role='presentation'>
        Mock WorksInfScroll
      </div>
    )
  },
}))

// hooks.tsをモック化
jest.mock('~/components/templates/SearchInfScroll/hook')

const searchData = {
  pageInfo: {
    page: 1,
    hasNextPage: false,
    count: 1,
    totalCount: 1,
    paginationLength: 1,
    hasPreviousPage: false,
  },
  nodes: {
    id: 'work_1',
    title: 'My Work',
    summary: 'This is a summary of my work',
    image_url: 'https://example.com/image.jpg',
    duration: '3 months',
    number_of_people: 5,
    language: '["JavaScript", "HTML", "CSS"]',
    role: 'Developer',
    url: '["https://example.com/works", "http://example.co.jp"]',
    brief_story: 'This is a brief story of my work',
    created_at: '2022-04-09T10:00:00.000Z',
    updated_at: '2022-04-09T10:00:00.000Z',
    serial_number: 1,
    user: {
      id: '12345',
      name: 'John Smith',
      email: 'john.smith@example.com',
      created_at: '2022-04-10T10:00:00.000Z',
      updated_at: '2022-04-10T10:00:00.000Z',
      serial_number: 1,
    },
  },
  type: Model.Work,
}

describe('SearchInfScrollWorks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(hooks.useFetchSearchWorks as jest.Mock).mockImplementation(() => ({
      searchData,
      onScroll: jest.fn(),
    }))
  })

  it('should render mocked WorksInfScroll component', () => {
    const { getByLabelText } = render(<SearchInfScrollWorks keyword='test' />)

    const mockedComponent = getByLabelText('WorksInfScroll')
    expect(mockedComponent).toBeInTheDocument()
  })
})