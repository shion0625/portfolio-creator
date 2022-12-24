import React, { memo } from 'react'
import Link from 'next/link'
import { Menu, MenuItem } from '@mui/material'

type Props = {
  anchorEl: null | HTMLElement //押されたボタンの位置を取得
  menuId: string //プロフィールメニューのID
  isMenuOpen: boolean //メニューが開いているかを取得
  handleMenuClose: () => void //プロフィールメニューを閉じる
}

const ProfileMenu: React.FC<Props> = memo(function profileMenu({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href='/'>
          <a>ホーム</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href='myPageEdit'>
          <a>ポートフォリオ編集</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href='users'>
          <a>ユーザ一覧</a>
        </Link>
      </MenuItem>
    </Menu>
  )
})

export default ProfileMenu
