import { render } from '@testing-library/react'
import {Item} from '~/components/screens//WorkFormItem/style'

describe('Item', () => {
  test('renders with correct styles', () => {
    const { container } = render(
        <Item />
    )

    const itemElement = container.firstChild
    expect(itemElement).toHaveStyle(`
      text-align: center;
      width: 500px;
      height: 500px;
      overflow-y: auto;
    `)
  })
})
