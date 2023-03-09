import { MenuItem, MenuItemProps } from '@mui/material'
import Link from 'next/link'
import React, { forwardRef } from 'react'

type LinkMenuItemProps = Omit<MenuItemProps<'a', { href: string }>, 'component' | 'button'> & {
  menuName: string
  onClick: () => void //プロフィールメニューを閉じる
}

const LinkMenuItem = forwardRef<HTMLAnchorElement, LinkMenuItemProps>(function LinkMenuItem(props, forwardedRef) {
  const { href, menuName, onClick, ...other } = props
  return (
    <Link href={href} passHref>
      <MenuItem component='span' ref={forwardedRef} {...other} onClick={onClick}>
        {menuName}
      </MenuItem>
    </Link>
  )
})

export default LinkMenuItem
