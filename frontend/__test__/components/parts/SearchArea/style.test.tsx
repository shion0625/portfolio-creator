import { getByTestId, render } from '@testing-library/react'
import { Search, SearchIconWrapper, StyledInputBase } from '~/components/parts/SearchArea/style'

describe('Search', () => {
  it('renders the component', () => {
    const { getByText } = render(<Search>Search</Search>)

    const search = getByText('Search')
    expect(search).toBeInTheDocument()
    expect(search).toHaveTextContent('Search')
    expect(search).toHaveStyle(`
      position: relative;
      border-radius: 4px;
      margin-left: 0px;
      width: 100%;
    `)
  })
})

describe('SearchIconWrapper', () => {
  it('renders the component', () => {
    const { getByText } = render(<SearchIconWrapper>SearchIconWrapper</SearchIconWrapper>)

    const search = getByText('SearchIconWrapper')
    expect(search).toBeInTheDocument()
    expect(search).toHaveTextContent('SearchIconWrapper')
    expect(search).toHaveStyle(`
      padding: 0px 16px;
      height: 100%;
      position: absolute;
      pointerEvents: none;
      display: flex;
      alignItems: center;
      justifyContent: center;
    `)
  })
})

describe('StyledInputBase', () => {
  it('renders the component', () => {
    const { getByRole } = render(<StyledInputBase />)

    const search = getByRole('textbox')
    expect(search).toBeInTheDocument()
    expect(search).toHaveStyle(`
    color: currentColor;
    padding:4px 0px 5px;
    width: 100%;
    `)
  })
})
