// WorkImageCardコンポーネントをテストする
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import type { Props as TransitionsModalProps } from '~/components/parts/TransitionsModal'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { Work } from '~/models/types'

// WorkItemコンポーネントをモック化する
jest.mock('~/components/screens/WorkItem', () => ({
  __esModule: true,
  default: () => <div>Mock WorkItem</div>,
}))

// TransitionsModalコンポーネントをモック化する
jest.mock('~/components/parts/TransitionsModal', () => ({
  __esModule: true,
  default: ({ children, handleOpen, handleClose, open }: TransitionsModalProps) => {
    const onClick = open ? handleClose : handleOpen
    return (
      <div role='presentation' onClick={onClick}>
        {children}
      </div>
    )
  },
}))

describe('WorkImageCardコンポーネント', () => {
  const user = {
    id: '1',
    name: 'Test User',
    serial_number: 1,
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
  }

  const work: Work = {
    id: '1',
    title: 'Test Work',
    summary: 'This is a test work',
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    serial_number: 1,
    is_delete: false,
    user: user,
  }

  it('The title, summary and user name must be correctly displayed on the card.', () => {
    render(<WorkImageCard work={work} />)
    expect(screen.getByText('Test Work')).toBeInTheDocument()
    expect(screen.getByText('This is a test work')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('Clicking on a card should open a modal.', () => {
    render(<WorkImageCard work={work} />)
    const card = screen.getByRole('img')
    fireEvent.click(card)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('Modal should display correctly when opened.', () => {
    render(<WorkImageCard work={work} />)
    const card = screen.getByRole('img')
    const titleElement = screen.getByText('Test Work')
    expect(titleElement).toBeInTheDocument()

    fireEvent.click(card)
    const modal = screen.getByText('Mock WorkItem')
    expect(modal).toBeInTheDocument()
  })

  it('Modal being closed.', () => {
    render(<WorkImageCard work={work} />)
    const card = screen.getByRole('img')
    fireEvent.click(card)

    const modal = screen.getByText('Mock WorkItem')
    fireEvent.click(modal)

    waitFor(() => {
      const modalElement = screen.queryByText('Mock WorkItem')
      expect(modalElement).not.toBeInTheDocument()
    })
  })
})
