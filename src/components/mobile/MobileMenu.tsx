import React, { memo } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';


type Props = {
  menuItem?: string[] //メニュー内のアイテム
  mobileMenuId: string // モバイルメニューに設定するID
  mobileMoreAnchorEl: null | HTMLElement //押されたボタンの位置を取得
  isMobileMenuOpen: boolean // メニューが開いているかを取得
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void // プロフィールメニューを表示
  handleMobileMenuClose: (event: React.MouseEvent<HTMLElement>) => void //モバイルメニューを閉じる
}

const MobileMenu: React.FC<Props> = memo(function mobileMenu({ menuItem, mobileMenuId, mobileMoreAnchorEl, isMobileMenuOpen, handleProfileMenuOpen, handleMobileMenuClose }) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )
})

export default MobileMenu
