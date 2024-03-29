import { Menu } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { memo } from 'react'
import LinkMenuItem from '~/components/parts/LinkMenuItem'

type Props = {
  anchorEl: null | HTMLElement //押されたボタンの位置を取得
  menuId: string //プロフィールメニューのID
  isMenuOpen: boolean //メニューが開いているかを取得
  handleMenuClose: () => void //プロフィールメニューを閉じる
}

const ProfileMenu: React.FC<Props> = memo(function ProfileMenu({ anchorEl, menuId, isMenuOpen, handleMenuClose }) {
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
      <LinkMenuItem menuName='ホーム' href='/' onClick={handleMenuClose} />
      <LinkMenuItem menuName='ユーザ一覧' href='/users' onClick={handleMenuClose} />
      <LinkMenuItem menuName='作品一覧' href='/works' onClick={handleMenuClose} />

      {session?.user?.id && (
        <LinkMenuItem
          menuName='ポートフォリオ編集'
          href={`/users/${session?.user?.id}/Edit`}
          onClick={handleMenuClose}
        />
      )}

      {session?.user?.id ? (
        <LinkMenuItem menuName='ログアウト' href={`/users/${session?.user?.id}/Edit`} onClick={handleMenuClose} />
      ) : (
        <LinkMenuItem menuName='ログイン' href={`/users/${session?.user?.id}/Edit`} onClick={handleMenuClose} />
      )}
    </Menu>
  )
})

export default ProfileMenu
