import { render } from '@testing-library/react'
import React from 'react'
import Link from '~/components/parts/Link'

describe('Link', () => {
  const linkProps = {
    href: '/example',
  }

  const children = 'Example Link'
  const target = '_blank'
  const rel = 'noopener noreferrer'

  it('renders a link with the correct href', () => {
    const { getByRole } = render(<Link linkProps={linkProps}>{children}</Link>)
    const link = getByRole('link', { name: children })
    expect(link).toHaveAttribute('href', linkProps.href)
  })

  it('renders a link with the correct target and rel', () => {
    const { getByRole } = render(
      <Link linkProps={linkProps} target={target} rel={rel}>
        {children}
      </Link>,
    )
    const link = getByRole('link', { name: children })
    expect(link).toHaveAttribute('target', target)
    expect(link).toHaveAttribute('rel', rel)
  })
})
