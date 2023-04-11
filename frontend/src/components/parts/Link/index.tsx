import { MuiLink } from './style'
import NextLink, { LinkProps } from 'next/link'
import React, { ReactNode, memo } from 'react'

export type Props = {
  linkProps: LinkProps // Next.jsのLinkProps
  children?: ReactNode // 子要素
  target?: string // クリックしたリンクの開く場所
  rel?: string // rel属性を表す
}

const Link: React.FC<Props> = memo(function Link({ linkProps, children, target, rel }) {
  // Next.jsのLinkコンポーネントを使ってリンクを作成する
  // hrefとpassHrefを指定して、クリックされたときに正しいURLにリダイレクトできるようにする
  return (
    <NextLink href={linkProps.href} passHref legacyBehavior>
      <MuiLink underline='none' target={target} rel={rel}>
        {children}
      </MuiLink>
    </NextLink>
  )
})

export default Link
