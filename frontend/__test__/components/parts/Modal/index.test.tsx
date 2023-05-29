import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Modal from '~/components/parts/Modal'

describe('Modal', () => {
  const buttonText = 'Open Modal'
  const children = 'ModalContent'

  it('should display the correct button text', () => {
    render(<Modal buttonText={buttonText}>{children}</Modal>)
    expect(screen.getByText(buttonText)).toBeInTheDocument()
  })

  it('should open the modal when the button is clicked', () => {
    render(<Modal buttonText={buttonText}>{children}</Modal>)
    fireEvent.click(screen.getByText(buttonText))
    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('should close the modal when the backdrop is clicked', () => {
    render(<Modal buttonText={buttonText}>{children}</Modal>)
    fireEvent.click(screen.getByText(buttonText))
    // Wait for the modal to be displayed
    waitFor(() => {
      expect(screen.getByText(children)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('presentation'))
    // Wait for the modal to transition out of the DOM
    waitFor(() => {
      expect(screen.queryByText(children)).not.toBeInTheDocument()
    })
  })

  it('should close the modal when the escape key is pressed', async () => {
    render(<Modal buttonText={buttonText}>{children}</Modal>)
    fireEvent.click(screen.getByText(buttonText))
    await waitFor(() => {
      expect(screen.getByText(children)).toBeInTheDocument()
    })
    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByText(children)).not.toBeInTheDocument()
    })
  })
})
