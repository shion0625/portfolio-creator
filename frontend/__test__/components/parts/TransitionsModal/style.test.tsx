import { render, screen } from '@testing-library/react'
import { ChildrenBox } from '~/components/parts/Modal/style'

describe('ChildrenBox', () => {
  it('should render correctly', () => {
    render(<ChildrenBox>Test</ChildrenBox>)
    const childrenBox = screen.getByText('Test')
    expect(childrenBox).toBeInTheDocument()
    expect(childrenBox).toHaveStyle({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'background.paper',
      border: '2px solid #000',
      boxShadow: '24',
      padding: '4',
    })
  })
})
