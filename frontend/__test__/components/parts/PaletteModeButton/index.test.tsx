import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import PaletteModeButton from '~/components/parts/PaletteModeButton'
import { usePaletteMode } from '~/stores/PaletteMode'

jest.mock('~/stores/PaletteMode', () => ({
  usePaletteMode: jest.fn(() => ['dark', jest.fn(), jest.fn()]),
}))

describe('PaletteModeButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component', () => {
    render(<PaletteModeButton />)

    expect(screen.getByLabelText('dark')).toBeInTheDocument()
  })

  it('should render the component at light', () => {
    ;(usePaletteMode as jest.Mock).mockReturnValue(['light', null, jest.fn()])
    render(<PaletteModeButton />)

    expect(screen.getByLabelText('light')).toBeInTheDocument()
  })

  it('should call toggleChangePaletteMode when the button is clicked', () => {
    const toggleChangePaletteModeMock = jest.fn()
    ;(usePaletteMode as jest.Mock).mockReturnValue(['dark', null, toggleChangePaletteModeMock])

    render(<PaletteModeButton />)
    const button = screen.getByLabelText('dark')

    fireEvent.click(button)

    expect(toggleChangePaletteModeMock).toHaveBeenCalled()
  })
})
