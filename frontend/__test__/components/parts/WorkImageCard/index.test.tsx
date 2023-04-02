import { render, screen, fireEvent } from '@testing-library/react'
import { WorkImageCard } from '~/components/parts/WorkImageCard'
import { Work } from '~/models/types'

describe('WorkImageCard', () => {
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

  it('should render the title, summary and user name correctly', () => {
    render(<WorkImageCard work={work} />)
    expect(screen.getByText('Test Work')).toBeInTheDocument()
    expect(screen.getByText('This is a test work')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('should open the modal when the card is clicked', () => {
    render(<WorkImageCard work={work} />)
    const card = screen.getByRole('img')
    fireEvent.click(card)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('should render the modal when it is open', () => {
    render(<WorkImageCard work={work} />)
    const card = screen.getByRole('img')
    fireEvent.click(card)
    const modalTitle = screen.getAllByText('Test Work')
    //cardに表示されるtitle
    expect(modalTitle[0]).toBeInTheDocument()
    //modalに表示されるタイトル
    expect(modalTitle[1]).toBeInTheDocument()
  })
})
