import { render } from '@testing-library/react'
import React from 'react'
import Link, { Props } from '~/components/parts/Link'

describe('Link', () => {
  const linkProps = {
    href: '/example',
  }
  const Props: Props = {
    linkProps: linkProps,
    children: 'Example Link',
    target: '_blank',
    rel: 'noopener noreferrer',
  }

  it('renders a link with the correct href', () => {
    const { getByLabelText } = render(<Link linkProps={Props.linkProps}>{Props.children}</Link>)
    const link = getByLabelText('MuiLink')
    expect(link).toHaveAttribute('href', linkProps.href)
  })

  it('renders a link with the correct children, target and rel', () => {
    const { getByLabelText } = render(<Link {...Props}>{Props.children}</Link>)
    const link = getByLabelText('MuiLink')
    expect(link.textContent).toBe(Props.children)
    expect(link).toHaveAttribute('target', Props.target)
    expect(link).toHaveAttribute('rel', Props.rel)
  })
})
