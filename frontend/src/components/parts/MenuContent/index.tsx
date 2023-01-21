import { MenuItem } from '@mui/material'
import Link from 'next/link'
import React, { memo } from 'react'
import MuiLink from '~/components/parts/MuiLink'

type Props = {
  menuName: string
  href: string
  onClick: () => void //プロフィールメニューを閉じる
}
const MenuContent: React.FC<Props> = memo(function menuContent({ menuName, href, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <Link href={href} passHref>
        <MuiLink> {menuName}</MuiLink>
      </Link>
    </MenuItem>
  )
})

export default MenuContent
