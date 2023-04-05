import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import InfScroll from '~/components/screens/InfScroll'

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
const generateItems = (first: number, count: number) => {
  const result = []
  for (let i = first; i <= count; i++) {
    result.push({ id: i, name: `item${i}` })
  }
  return result
}

describe('InfScroll', () => {
  const props = {
    pageInfo: {
      count: 1,
      hasPreviousPage: true,
      page: 1,
      paginationLength: 1,
      totalCount: 1,
      hasNextPage: true,
    },
    items: generateItems(1, 15),
    renderItem: (item: any) => <div>{item.name}</div>,
    onScroll: jest.fn(),
  }

  it('renders items correctly', () => {
    render(<InfScroll {...props} />)
    expect(screen.getByText('item1')).toBeInTheDocument()
    expect(screen.getByText('item2')).toBeInTheDocument()
    expect(screen.getByText('item13')).toBeInTheDocument()
  })

  it('renders loading indicator when scrolling to the end', async () => {
    render(<InfScrollTest />)
    const scrollParent = screen.getByRole('main')
    Object.defineProperty(scrollParent, 'scrollHeight', { value: 300 })
    Object.defineProperty(scrollParent, 'clientHeight', { value: 100 })
    Object.defineProperty(scrollParent, 'scrollTop', { value: 200 })
    fireEvent.scroll(scrollParent)
    expect(screen.getByText('item10')).toBeInTheDocument()
    expect(await screen.findByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText('item11')).not.toBeInTheDocument()
  })

  it('does not render loading indicator when at the end of the list and there is no more data', async () => {
    const noMoreDataPageInfo = { ...props.pageInfo, hasNextPage: false }
    render(<InfScroll {...props} pageInfo={noMoreDataPageInfo} />)
    const scrollParent = screen.getByRole('main')

    Object.defineProperty(scrollParent, 'scrollHeight', { value: 300 })
    Object.defineProperty(scrollParent, 'clientHeight', { value: 100 })
    Object.defineProperty(scrollParent, 'scrollTop', { value: 200 })
    fireEvent.scroll(scrollParent)
    waitFor(() => expect(props.onScroll).toHaveBeenCalled())
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  function InfScrollTest() {
    const [items, setItems] = useState(generateItems(1, 10))

    const onScroll = () => {
      const newItems = generateItems(11, 15)
      setItems((prevItems) => [...prevItems, ...newItems])
    }

    return <InfScroll {...props} items={items} onScroll={onScroll} />
  }
})
