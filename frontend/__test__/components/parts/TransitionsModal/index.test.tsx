import { render, screen, fireEvent } from '@testing-library/react'
import TransitionsModal from '~/components/parts/TransitionsModal'

describe('TransitionsModal', () => {
      const props = {
      handleOpen: jest.fn(),
      handleClose: jest.fn(),
      modalContent: 'This is the modal content',
      open: true,
    }
  it('should render the modal content', () => {
    render(
      <TransitionsModal {...props}>
        {props.modalContent}
      </TransitionsModal>
    )

    const modal = screen.getByLabelText('modal')
    const modalContentElement = screen.getByText(props.modalContent)

    expect(modal).toBeInTheDocument()
    expect(modalContentElement).toBeInTheDocument()
  })

  it('should call the handleClose function when the modal is closed', async() => {
    const handleClose = jest.fn()

    render(
      <TransitionsModal {...props} handleClose={handleClose}>
        {props.modalContent}
      </TransitionsModal>
    )

    const modal = screen.getByLabelText('modal')
    fireEvent.click(modal);

    expect(handleClose).toHaveBeenCalled()
  })
})
