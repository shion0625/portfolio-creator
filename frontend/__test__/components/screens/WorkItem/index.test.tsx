import { render } from '@testing-library/react'
import React from 'react'
import WorkItem from '~/components/screens//WorkItem'
import { WorkContext } from '~/stores/WorkView'

jest.mock('~/components/parts/RandomColorChip', () => ({
  __esModule: true,
  default: ({ content }: any) => {
    return (
      <span aria-label='language' role='presentation'>
        {content}
      </span>
    )
  },
}))

jest.mock('~/components/parts/Link', () => ({
  __esModule: true,
  default: ({ linkProps, children, target, rel }: any) => {
    return (
      <a href={linkProps.href} aria-label='url' target={target} rel={rel}>
        {children}
      </a>
    )
  },
}))

describe('WorkItem', () => {
  const mockWork = {
    id: '1',
    title: 'Test Work',
    summary: 'This is a test work.',
    duration: '6',
    number_of_people: 3,
    role: 'Tester',
    brief_story: 'This is a brief story.',
    language: '["JavaScript", "HTML", "CSS"]',
    url: '["https://example.com", "http://example.co.jp"]',
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    serial_number: 1,
    is_delete: false,
    user: {
      id: '1',
      name: 'Test User',
      serial_number: 1,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  }

  it('renders all the work information', () => {
    const { getByText, getByRole, getAllByLabelText } = render(
      <WorkContext.Provider value={{ work: mockWork }}>
        <WorkItem />
      </WorkContext.Provider>,
    )

    expect(getByText(mockWork.title)).toBeInTheDocument()
    expect(getByText(mockWork.summary)).toBeInTheDocument()
    expect(getByText(`開発期間: ${mockWork.duration}ヶ月`)).toBeInTheDocument()
    expect(getByText(`開発人数: ${mockWork.number_of_people}人`)).toBeInTheDocument()
    expect(getByText(mockWork.role)).toBeInTheDocument()
    expect(getByText(mockWork.brief_story)).toBeInTheDocument()

    const languageChips = getByRole('list').children
    expect(languageChips.length).toBe(3)
    expect(languageChips[0]).toHaveTextContent('JavaScript')
    expect(languageChips[1]).toHaveTextContent('HTML')
    expect(languageChips[2]).toHaveTextContent('CSS')

    const urlLinks = getAllByLabelText('url')
    const mockLinks = ['https://example.com', 'http://example.co.jp']
    expect(urlLinks.length).toBe(2)
    urlLinks.forEach((urlLink, index) => {
      expect(urlLink).toHaveAttribute('href', mockLinks[index])
      expect(urlLink).toHaveAttribute('target', '_blank')
      expect(urlLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders work information some colum is null', () => {
    const mockWorkNull = {
      id: '1',
      title: 'Test Work',
      summary: '',
      duration: '',
      number_of_people: 0,
      role: '',
      brief_story: '',
      language: '',
      url: '',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
      serial_number: 1,
      is_delete: false,
      user: {
        id: '1',
        name: 'Test User',
        serial_number: 1,
        created_at: new Date(Date.now()).toISOString(),
        updated_at: new Date(Date.now()).toISOString(),
      },
    }

    const { getByText, queryByText, queryByLabelText, getByLabelText } = render(
      <WorkContext.Provider value={{ work: mockWorkNull }}>
        <WorkItem />
      </WorkContext.Provider>,
    )

    expect(getByLabelText('title').textContent).toBe(mockWorkNull.title)
    expect(getByLabelText('summary').textContent).toBe(mockWorkNull.summary)
    expect(getByLabelText('duration').textContent).toBe(`開発期間: ${mockWorkNull.duration}ヶ月`)
    expect(getByLabelText('number_of_people').textContent).toBe(`開発人数: ${mockWorkNull.number_of_people}人`)
    expect(getByLabelText('role').textContent).toBe(mockWorkNull.role)
    expect(getByLabelText('brief_story').textContent).toBe(mockWorkNull.brief_story)

    const languageChips = queryByLabelText('language')
    expect(languageChips).toBeNull()
    expect(languageChips).not.toBeInTheDocument()

    const urlLinks = queryByLabelText('url')
    expect(urlLinks).toBeNull()
    expect(urlLinks).not.toBeInTheDocument()
  })
})
