import React, { memo } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton, Badge } from '@mui/material';

type Props = {
  anchorEl: null | HTMLElement //押されたボタンの位置を取得
  menuId: string //プロフィールメニューのID
  isMenuOpen: boolean //メニューが開いているかを取得
  handleMenuClose: () => void //プロフィールメニューを閉じる
}

const ProfileMenu: React.FC<Props> = memo(function profileMenu({ anchorEl, menuId, isMenuOpen, handleMenuClose }) {
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )
})

export default ProfileMenu
