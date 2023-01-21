import { Menu, MenuItem } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { memo } from 'react'

type Props = {
  anchorEl: null | HTMLElement //押されたボタンの位置を取得
  menuId: string //プロフィールメニューのID
  isMenuOpen: boolean //メニューが開いているかを取得
  handleMenuClose: () => void //プロフィールメニューを閉じる
}

const ProfileMenu: React.FC<Props> = memo(function profileMenu({ anchorEl, menuId, isMenuOpen, handleMenuClose }) {
  const { data: session, status } = useSession()

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
        <Link href='/users'>
          <a>ユーザ一覧</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href='/works'>
          <a>作品一覧</a>
        </Link>
      </MenuItem>
      {session?.user?.id && (
        <MenuItem onClick={handleMenuClose}>
          <Link href={`/users/${session?.user?.id}/Edit`}>
            <a>ポートフォリオ編集</a>
          </Link>
        </MenuItem>
      )}

      {session?.user?.id ? (
        <MenuItem onClick={handleMenuClose}>
          <Link href={`/users/${session?.user?.id}/Edit`}>
            <a>ログアウト</a>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Link href={`/users/${session?.user?.id}/Edit`}>
            <a>ログイン</a>
          </Link>
        </MenuItem>
      )}
    </Menu>
  )
})

export default ProfileMenu
