import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'
import SearchArea from '~/components/parts/SearchArea'

describe('SearchArea component', () => {
  const inputElement = createRef<HTMLInputElement>()

  it('renders correctly', () => {
    render(
      <SearchArea
        inputElement={inputElement}
        onEnterKey={() => {}}
        startComposition={() => {}}
        endComposition={() => {}}
      />,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
    expect(screen.getByLabelText('search')).toBeInTheDocument()
  })

  it('calls onEnterKey function when the enter key is pressed', () => {
    const onEnterKey = jest.fn()
    render(
      <SearchArea
        inputElement={inputElement}
        onEnterKey={onEnterKey}
        startComposition={() => {}}
        endComposition={() => {}}
      />,
    )
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', keyCode: 13 })
    expect(onEnterKey).toHaveBeenCalledTimes(1)
  })

  it('calls startComposition and endComposition functions when the input starts and ends composition', () => {
    const startComposition = jest.fn()
    const endComposition = jest.fn()
    render(
      <SearchArea
        inputElement={inputElement}
        onEnterKey={() => {}}
        startComposition={startComposition}
        endComposition={endComposition}
      />,
    )
    fireEvent.compositionStart(screen.getByRole('textbox'))
    fireEvent.compositionEnd(screen.getByRole('textbox'))
    expect(startComposition).toHaveBeenCalledTimes(1)
    expect(endComposition).toHaveBeenCalledTimes(1)
  })
})
