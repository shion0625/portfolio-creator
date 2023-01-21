import { MenuItem } from '@mui/material'
import Link from 'next/link'
import React, { memo } from 'react'

type Props = {
  menuName: string
  href: string
  onClick: () => void //プロフィールメニューを閉じる
}
const MenuContent: React.FC<Props> = memo(function menuContent({ menuName, href, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <Link href={href}>
        <a>{menuName}</a>
      </Link>
    </MenuItem>
  )
})

export default MenuContent
