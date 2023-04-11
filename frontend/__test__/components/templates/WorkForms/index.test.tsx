import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import React from 'react'
import WorkForms from '~/components/templates/WorkForms'
import { GetUserAuthQuery } from '~/models/client'

jest.mock('~/components/screens/WorkFormImageCard', () => ({
  __esModule: true,
  default: ({ removeWork, workIndex, getValues }: any) => {
    const workId = getValues(`works.${workIndex}.id`)
    const handleRemove = () => removeWork(workIndex, workId)

    return (
      <div aria-label='WorkFormImageCard' role='presentation'>
        <button aria-label='removeWork' onClick={handleRemove}>
          削除
        </button>
        <p aria-label='workId'>{workId}</p>
      </div>
    )
  },
}))

describe('WorkForms', () => {
  const onSubmit = jest.fn()
  const removeWorkIds: string[] = []

  const userAuth: GetUserAuthQuery = {
    userAuth: {
      id: '12345',
      name: 'John Smith',
      email: 'john.smith@example.com',
      created_at: '2022-04-10T10:00:00.000Z',
      updated_at: '2022-04-10T10:00:00.000Z',
      serial_number: 1,
      works: {
        pageInfo: {
          page: 1,
          hasNextPage: false,
          count: 1,
          totalCount: 1,
          paginationLength: 1,
          hasPreviousPage: false,
        },
        nodes: [
          {
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
          },
          {
            id: 'work_2',
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
            serial_number: 2,
          },
        ],
      },
    },
  }

  const Props = {
    onSubmit,
    removeWorkIds,
    userAuth: userAuth.userAuth,
  }
  it('should render the WorkForms component', async () => {
    const { getAllByLabelText } = render(<WorkForms {...Props} />)

    const workFormImageCards = getAllByLabelText('WorkFormImageCard')
    expect(workFormImageCards).toHaveLength(2)

    workFormImageCards.forEach((workFormImageCard, index) => {
      expect(workFormImageCard.textContent).toBe(`削除${userAuth.userAuth.works?.nodes[index].id}`)
    })
  })

  it('should add new work when add button is clicked', async () => {
    const { getByText, getAllByLabelText } = render(<WorkForms {...Props} />)

    // add button
    const addButton = getByText('行を追加する')

    // click add button
    fireEvent.click(addButton)

    // wait for add process to complete
    await waitFor(() => {})

    const workFormImageCards = getAllByLabelText('WorkFormImageCard')
    expect(workFormImageCards).toHaveLength(3)
    //配列の最後の要素, workIdが空
    expect(workFormImageCards.slice(-1)[0]).toHaveTextContent('削除')
  })

  it('should reset works when reset button is clicked', async () => {
    const { getByText, getAllByLabelText } = render(<WorkForms {...Props} />)

    // reset button
    const resetButton = getByText('全削除')

    // click add button
    fireEvent.click(resetButton)

    // wait for add process to complete
    await waitFor(() => {})

    const workFormImageCard = getAllByLabelText('WorkFormImageCard')
    expect(workFormImageCard).toHaveLength(1)
  })

  it('should remove work when remove button is clicked', async () => {
    const { getAllByText, getAllByLabelText } = render(<WorkForms {...Props} />)

    // remove button
    const removeButton = getAllByText('削除')

    // click remove button
    fireEvent.click(removeButton[0])

    // wait for remove process to complete
    await waitFor(() => {})

    const workFormImageCards = getAllByLabelText('WorkFormImageCard')
    expect(workFormImageCards).toHaveLength(1)
    expect(workFormImageCards[0]).toHaveTextContent(`削除${userAuth.userAuth.works?.nodes[1].id}`)
  })

  it('should submit work when submit button is clicked', async () => {
    const onSubmit = jest.fn()
    const { getByText } = render(<WorkForms {...Props} onSubmit={onSubmit} />)

    // remove button
    const submitButton = getByText('送信')

    // click remove button
    fireEvent.click(submitButton)

    // wait for remove process to complete
    await waitFor(() => {})
    expect(onSubmit).toBeCalled()
  })
})
