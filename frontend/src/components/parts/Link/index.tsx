import { MuiLink } from './style'
import NextLink, { LinkProps } from 'next/link'
import React, { ReactNode, memo } from 'react'

type Props = {
  linkProps: LinkProps
  children?: ReactNode
  target?: string
  rel?: string
}

const Link: React.FC<Props> = memo(function Link({ linkProps, children, target, rel }) {
  return (
    <NextLink href={linkProps.href} passHref legacyBehavior>
      <MuiLink underline='none' target={target} rel={rel}>
        {children}
      </MuiLink>
    </NextLink>
  )
})

export default Link
